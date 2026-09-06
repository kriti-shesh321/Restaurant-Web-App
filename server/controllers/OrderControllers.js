import { User, DeliveryAddresses, MenuItem, OrderItems, Orders, Payments, Cart, sequelize } from "../models/index.js";

import Sequelize from "sequelize";

//@desc Create a new order
//@route POST /api/v1/order
export const createOrder = async (req, res, next) => {
    const transaction = await sequelize.transaction();

    try {
        const userId = req.user || null;
        const isGuest = !userId;

        const {
            orderType = "delivery",
            deliveryAddressId,
            tableNumber,
            items,
            paymentMethod = "cash",
        } = req.body;

        // Validate payment method

        if (!["cash", "card"].includes(paymentMethod)) {
            await transaction.rollback();

            return res.status(400).json({
                message: "Invalid payment method.",
            });
        }

        // Validate order type

        if (!["delivery", "dine-in"].includes(orderType)) {
            await transaction.rollback();

            return res.status(400).json({
                message: "Invalid order type.",
            });
        }

        // Validate delivery / dine-in context

        if (orderType === "delivery") {
            if (!deliveryAddressId) {
                await transaction.rollback();

                return res.status(400).json({
                    message: "Delivery address is required.",
                });
            }

            const validAddress = await DeliveryAddresses.findOne({
                where: {
                    id: deliveryAddressId,
                    ...(userId ? { userId } : {}),
                },
                transaction,
            });

            if (!validAddress) {
                await transaction.rollback();

                return res.status(404).json({
                    message: "Delivery address not found.",
                });
            }
        }

        if (orderType === "dine-in") {
            if (!tableNumber) {
                await transaction.rollback();

                return res.status(400).json({
                    message: "Table number is required for dine-in orders.",
                });
            }
        }

        // Determine where the order items come from.

        // Mobile sends items from its Zustand cart.
        // Existing web authenticated checkout may not send items, so fall back to the user's server-side cart.

        let orderInputItems = items;

        if (!Array.isArray(orderInputItems) || orderInputItems.length === 0) {
            if (!userId) {
                await transaction.rollback();

                return res.status(400).json({
                    message: "Order must contain at least one item.",
                });
            }

            const cartItems = await Cart.findAll({
                where: {
                    userId,
                },
                include: [
                    {
                        model: MenuItem,
                        as: "menuItem",
                        attributes: ["id", "name", "price", "availability"],
                    },
                ],
                transaction,
            });

            if (!cartItems.length) {
                await transaction.rollback();

                return res.status(400).json({
                    message: "Your cart is empty.",
                });
            }

            orderInputItems = cartItems.map((cartItem) => ({
                menuItemId: cartItem.menuItem.id,
                quantity: cartItem.quantity,
            }));
        }

        // Fetch real menu items from DB

        const menuItemIds = orderInputItems.map(
            (item) => item.menuItemId
        );

        const menuItems = await MenuItem.findAll({
            where: {
                id: menuItemIds,
            },
            attributes: [
                "id",
                "name",
                "price",
                "availability",
            ],
            transaction,
        });

        if (menuItems.length !== orderInputItems.length) {
            await transaction.rollback();

            return res.status(400).json({
                message: "One or more menu items are invalid.",
            });
        }

        const menuItemMap = new Map(
            menuItems.map((item) => [item.id, item])
        );

        // Build order items using server prices

        const orderItems = [];

        for (const item of orderInputItems) {
            const menuItem = menuItemMap.get(item.menuItemId);

            const quantity = Number(item.quantity);

            if (!Number.isInteger(quantity) || quantity <= 0) {
                await transaction.rollback();

                return res.status(400).json({
                    message: "Invalid item quantity.",
                });
            }

            if (menuItem.availability !== "online" && menuItem.availability !== "both") {
                await transaction.rollback();

                return res.status(400).json({
                    message: `${menuItem.name} is not currently available online.`,
                });
            }

            orderItems.push({
                menuItemId: menuItem.id,
                quantity,
                price: parseFloat(menuItem.price),
            });
        }

        // Calculate total

        const total = orderItems.reduce(
            (sum, item) =>
                sum + item.quantity * item.price,
            0
        );

        // Cash orders can be confirmed immediately.
        // Card orders remain pending until Stripe confirms payment.

        const initialStatus =
            paymentMethod === "cash"
                ? "Confirmed"
                : "Pending";

        // Create order

        const order = await Orders.create(
            {
                isGuest,
                userId,
                orderType,
                deliveryAddressId:
                    orderType === "delivery"
                        ? deliveryAddressId
                        : null,
                tableNumber:
                    orderType === "dine-in"
                        ? tableNumber
                        : null,
                totalAmount: total.toFixed(2),
                status: initialStatus,
            },
            { transaction }
        );

        // Create order items

        const orderItemsData = orderItems.map((item) => ({
            orderId: order.id,
            ...item,
        }));

        await OrderItems.bulkCreate(
            orderItemsData,
            { transaction }
        );

        // Clear the existing server cart when it was used.
        // Mobile uses a client-side Zustand cart, so it does not depend on this.

        if (userId && (!Array.isArray(items) || items.length === 0)) {
            await Cart.destroy({
                where: { userId },
                transaction,
            });
        }

        await transaction.commit();

        return res.status(201).json({
            message: "Order placed.",
            order,
        });

    } catch (error) {
        await transaction.rollback();

        console.error("Error placing order:", error);

        return res.status(500).json({ message: "Server error" });
    }
};

//@desc Get orders by user ID
//@route GET /api/v1/order
export const getOrdersByUserId = async (req, res) => {
    try {
        const userId = req.user;

        const orders = await Orders.findAll({
            where: { userId },
            attributes: {
                exclude: ['isGuest'],
                include: [
                    [
                        Sequelize.literal(`(SELECT COUNT(*) FROM OrderItems AS items WHERE items.orderId = Orders.id)`),
                        'itemCount'
                    ]
                ]
            },
            include: [
                {
                    model: DeliveryAddresses,
                    as: 'deliveryAddress',
                    attributes: { exclude: ['isGuest', 'guestName', 'userId', 'createdAt', 'updatedAt'] }
                },
                {
                    model: Payments,
                    as: "payment",
                    attributes: ["status", "provider", "amount", "currency"],
                },
            ],
            order: [['createdAt', 'DESC']]
        });

        if (!orders.length) {
            return res.status(200).json({ message: "No orders found for this user", orders: [] });
        }

        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

//@desc Get order by ID
//@route GET /api/v1/order/:id
export const getOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const userId = req.user;

        const order = await Orders.findOne({
            where: { id: orderId, userId },
            attributes: { exclude: ['isGuest'] },
            include: [
                {
                    model: DeliveryAddresses,
                    as: 'deliveryAddress',
                    attributes: { exclude: ['isGuest', 'guestName', 'userId', 'createdAt', 'updatedAt'] }
                },
                {
                    model: OrderItems,
                    as: 'items',
                    attributes: { exclude: ['id', 'orderId', 'createdAt', 'updatedAt'] },
                    include: {
                        model: MenuItem,
                        as: 'menuItem',
                        attributes: ['name']
                    }
                },
                {
                    model: Payments,
                    as: "payment",
                    attributes: ["status", "provider", "amount", "currency"],
                },
            ]
        });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


const STATUS_TRANSITIONS = {
    Pending: ["Confirmed", "Cancelled"],

    Confirmed: ["Preparing Order", "Cancelled"],

    "Preparing Order": ["Ready", "Out for Delivery", "Cancelled"],

    Ready: ["Served"],

    "Out for Delivery": ["Delivered"],

    Served: [],

    Delivered: [],

    Cancelled: [],
};

export const updateOrderStatus = async (req, res) => {
    try {
        const orderId = req.params.id;
        const { status } = req.body;

        // Check staff role

        const user = await User.findByPk(req.user);

        if (!user || user.role !== "staff") {
            return res.status(403).json({ message: "Only staff can update order status." });
        }

        // Validate requested status

        if (!Object.prototype.hasOwnProperty.call(STATUS_TRANSITIONS, status)) {
            return res.status(400).json({ message: "Invalid order status." });
        }

        // Find order

        const order = await Orders.findByPk(orderId);

        if (!order) {
            return res.status(404).json({ message: "Order not found." });
        }

        // Validate state transition

        const allowedNextStatuses = STATUS_TRANSITIONS[order.status] || [];

        if (!allowedNextStatuses.includes(status)) {
            return res.status(400).json({ message: `Cannot move order from "${order.status}" to "${status}".` });
        }

        // Update

        await order.update({ status });

        return res.status(200).json({ message: "Order status updated.", order });

    } catch (error) {
        console.error("Error updating order status:", error);

        return res.status(500).json({ message: "Server error" });
    }
};