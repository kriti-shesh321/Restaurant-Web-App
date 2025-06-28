import { Cart, DeliveryAddresses, MenuItem, OrderItems, Orders } from "../models/index.js";
import Sequelize from "sequelize";

//@desc Create a new order
//@route POST /api/v1/order
// export const createOrder = async (req, res) => {
//     try {
//         const { userId, isGuest, items, deliveryAddressId, totalAmount } = req.body;

//         if (!deliveryAddressId || !items || items.length === 0 || !totalAmount) {
//             return res.status(400).json({ message: "Invalid order data" });
//         }

//         const order = await Orders.create({
//             isGuest,
//             userId,
//             deliveryAddressId,
//             totalAmount
//         });

//         const orderItems = items.map(item => ({
//             orderId: order.id,
//             menuItemId: item.menuItemId,
//             quantity: item.quantity,
//             price: item.price,
//             status: "Confirmed"
//         }));

//         await OrderItems.bulkCreate(orderItems);

//         await CartItems.destroy({ where: { userId } });

//         res.status(201).json({ message: "Order created successfully", order });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server error" });
//     }
// };

export const createOrder = async (req, res, next) => {
    try {
        const userId = req.user || null;
        const { deliveryAddressId, items, totalAmount } = req.body;
        const isGuest = !req.user;
        let total = 0;
        let orderItems = [];

        if (!deliveryAddressId) return res.status(400).json({ message: "Please enter delivery address." });

        const validAddress = await DeliveryAddresses.findByPk(deliveryAddressId);
        if (!validAddress) return res.status(404).json({ message: "Delivery Address not found." });

        if (userId) {
            const cartItems = await Cart.findAll({
                where: { userId },
                include: {
                    model: MenuItem,
                    as: 'menuItem',
                    attributes: ['id', 'name', 'price'],
                }
            });

            if (!cartItems.length) {
                return res.status(400).json({ message: "Cart is empty" });
            }

            orderItems = cartItems.map(item => ({
                menuItemId: item.menuItem.id,
                quantity: item.quantity,
                price: parseFloat(item.menuItem?.price)
            }));

            total = orderItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

        } else {
            if (!items || !items.length || !totalAmount) {
                return res.status(400).json({ message: "Invalid guest order data" });
            }

            orderItems = items.map(item => ({
                menuItemId: item.menuItemId || item.menuItem?.id,
                quantity: item.quantity,
                price: parseFloat(item.menuItem?.price || item.price)
            }));

            total = orderItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
        }

        const order = await Orders.create({
            isGuest,
            userId,
            deliveryAddressId,
            totalAmount: total,
            status: "Confirmed"
        });

        const orderItemsData = orderItems.map(item => ({
            orderId: order.id,
            ...item
        }));

        await OrderItems.bulkCreate(orderItemsData);
        await Cart.destroy({ where: { userId } });

        return res.status(201).json({ message: "Order placed.", order });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ message: "Server error" });
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
            return res.status(404).json({ message: "No orders found for this user" });
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