import express from "express";
import { getOfflineMenu, getOnlineMenu, getMenuItemById } from "../controllers/MenuControllers.js";

const router = express.Router();

router.get('/offline', getOfflineMenu);
router.get('/online', getOnlineMenu);
router.get('/:id', getMenuItemById);

export default router;