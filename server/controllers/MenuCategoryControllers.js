import { MenuCategory } from "../models/index.js";

export const getMenuCategories = async (req, res) => {
  try {
    const categories = await MenuCategory.findAll();

    if (!categories || categories.length === 0) return res.status(404).json({ message: "No menu categories found" });
    
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching menu categories:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}