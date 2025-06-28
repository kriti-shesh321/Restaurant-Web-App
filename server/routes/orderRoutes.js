import { Router } from "express";
import authenticate from "../middleware/authMiddleware.js";
import optionalAuth from "../middleware/optionalAuth.js";
import {
  createOrder,
  getOrdersByUserId,
  getOrderById,
} from "../controllers/OrderControllers.js";

const router = Router();

router.post("/", optionalAuth, createOrder);
router.get("/:id", authenticate, getOrderById);
router.get("/", authenticate, getOrdersByUserId);

export default router;