import { Router } from "express";
import { getMenuCategories } from "../controllers/MenuCategoryControllers.js";

const router = Router();

router.get("/", getMenuCategories);

export default router;