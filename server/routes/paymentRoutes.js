import { Router } from "express";

import authenticate from "../middleware/authMiddleware.js";

import { createPaymentIntent } from "../controllers/PaymentControllers.js";

const router = Router();

router.post("/create-intent", authenticate, createPaymentIntent);

export default router;