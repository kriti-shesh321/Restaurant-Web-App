import express from "express";
import { getRestaurantDetails } from "../controllers/restaurantSettingsControllers.js";

const router = express.Router();

router.get('/', getRestaurantDetails);

export default router;
