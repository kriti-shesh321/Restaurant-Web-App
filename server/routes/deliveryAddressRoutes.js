import { Router } from "express";
import authenticate from "../middleware/authMiddleware.js";
import optionalAuth from "../middleware/optionalAuth.js";
import { getDeliveryAddresses, addDeliveryAddress, editDeliveryAddress, deleteDeliveryAddress } from "../controllers/DeliveryAddressControllers.js";

const router = Router();

router.get("/", authenticate, getDeliveryAddresses);
router.post("/", optionalAuth, addDeliveryAddress);
router.put("/:id", authenticate, editDeliveryAddress);
router.delete("/:id", authenticate, deleteDeliveryAddress);

export default router;