import express from "express";
import authenticate from "../middleware/authMiddleware.js";
import { getCartItems, addItemToCart, updateCartItemQuantity } from "../controllers/CartControllers.js";

const router = express.Router();

router.get('/', authenticate, getCartItems);
router.post('/', authenticate, addItemToCart);
router.patch('/:id', authenticate, updateCartItemQuantity);

export default router;