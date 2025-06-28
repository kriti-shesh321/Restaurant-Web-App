import { Cart, MenuItem } from '../models/index.js';

// @desc Get cart items for a user
// @route GET /api/v1/cart
export const getCartItems = async (req, res) => {
    try {
        const userId = req.user;
        const cartItems = await Cart.findAll({
            where: { userId },
            attributes: { exclude: ['itemId'] },
            include: [{
                model: MenuItem,
                as: 'menuItem',
                attributes: ['id', 'name', 'price'],
            }]
        });

        const total = cartItems.reduce((sum, item) => {
            const price = parseFloat(item.menuItem?.price || 0);
            return sum + (price * item.quantity);
        }, 0);

        return res.status(200).json({ cartItems, total });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error.' });
    }
};

// @desc Add item to cart
// @route GET /api/v1/cart
export const addItemToCart = async (req, res) => {
    try {
        const userId = req.user;
        const { menuItemId } = req.body;
        const quantity = parseInt(req.body.quantity, 10);

        if (isNaN(quantity) || quantity <= 0) {
            return res.status(400).json({ message: "Invalid quantity." });
        }

        const menuItem = await MenuItem.findOne({ where: { id: menuItemId } });
        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found.' });
        }

        const existingCart = await Cart.findOne({
            where: { userId, itemId: menuItemId }
        });

        if (existingCart) {
            existingCart.quantity += quantity;
            await existingCart.save();
        } else {
            await Cart.create({
                userId,
                itemId: menuItemId,
                quantity
            });
        }
        return res.status(200).json({ message: 'Cart updated sucessfully.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error.' });
    }
};

// @desc Update quantity of an item in cart
// @route PATCH /api/v1/cart/:id
export const updateCartItemQuantity = async (req, res) => {
    try {
        const userId = req.user;
        const { id } = req.params;
        const { quantity } = req.body;

        const cartItem = await Cart.findOne({
            where: { id, userId }
        });

        if (!cartItem) return res.status(404).json({ message: 'Cart item not found.' });

        if (quantity == 0) {
            await cartItem.destroy();
            return res.status(200).json({ message: 'Cart item removed successfully.' });
        }

        cartItem.update({ quantity });

        return res.status(200).json({ message: 'Cart item updated successfully.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error.' });
    }
};