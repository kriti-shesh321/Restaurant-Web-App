import { User, DeliveryAddresses, MenuItem, OrderItems, Orders } from "../models/index.js";
import Sequelize from "sequelize";

//@desc Create a new order
//@route POST /api/v1/order
export const createOrder = async (req, res, next) => {
    try {
        const userId = req.user || null;
        const isGuest = !userId;

        const {
            orderType = "delivery",
            deliveryAddressId,
            tableNumber,
            items,
        } = req.body;

        // Validate order type

        if (!["delivery", "dine-in"].includes(orderType)) {
            return res.status(400).json({ message: "Invalid order type.", });
        }

        // Validate delivery / dine-in context

        if (orderType === "delivery") {
            if (!deliveryAddressId) {
                return res.status(400).json({ message: "Delivery address is required.", });
            }

            const validAddress = await DeliveryAddresses.findOne({
                where: { id: deliveryAddressId, ...(userId ? { userId } : {}) },
            });

            if (!validAddress) {
                return res.status(404).json({ message: "Delivery address not found.", });
            }
        }

        if (orderType === "dine-in") {
            if (!tableNumber) {
                return res.status(400).json({ message: "Table number is required for dine-in orders.", });
            }
        }

        // Validate cart items

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: "Order must contain at least one item." });
        }

        // Fetch real menu items from DB

        const menuItemIds = items.map(item => item.menuItemId);

        const menuItems = await MenuItem.findAll({
            where: { id: menuItemIds, },
            attributes: ["id", "name", "price", "availability"],
        });

        if (menuItems.length !== items.length) {
            return res.status(400).json({ message: "One or more menu items are invalid." });
        }

        const menuItemMap = new Map(
            menuItems.map(item => [item.id, item])
        );

        // Build order items using server prices

        const orderItems = [];

        for (const item of items) {
            const menuItem = menuItemMap.get(item.menuItemId);

            const quantity = Number(item.quantity);

            if (!Number.isInteger(quantity) || quantity <= 0) {
                return res.status(400).json({ message: "Invalid item quantity." });
            }

            if (menuItem.availability !== "online" && menuItem.availability !== "both") {
                return res.status(400).json({ message: `${menuItem.name} is not currently available online.`, });
            }

            orderItems.push({
                menuItemId: menuItem.id,
                quantity,
                price: parseFloat(menuItem.price),
            });
        }

        // Calculate total on the server

        const total = orderItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

        // Create order

        const order = await Orders.create({
            isGuest,
            userId,
            orderType,
            deliveryAddressId: orderType === "delivery" ? deliveryAddressId : null,
            tableNumber: orderType === "dine-in" ? tableNumber : null,
            totalAmount: total.toFixed(2),
            status: "Pending",
        });

        // Create order items

        const orderItemsData = orderItems.map(item => ({
            orderId: order.id,
            ...item,
        }));

        await OrderItems.bulkCreate(orderItemsData);

        return res.status(201).json({
            message: "Order placed.",
            order,
        });

    } catch (error) {
        console.error("Error placing order:", error);

        return res.status(500).json({ message: "Server error", });
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
                }
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
                }
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