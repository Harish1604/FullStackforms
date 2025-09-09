import express from "express";
import Category from "../models/Category";

const router = express.Router();

// Create Category
router.post("/", async (req, res) => {
  const { categoryName, parentCategoryId, status } = req.body;

  try {
    // Check duplicate
    const existing = await Category.findOne({ categoryName });
    if (existing)
      return res.status(400).json({ message: "Category already exists" });

    const category = new Category({ categoryName, parentCategoryId, status });
    await category.save();

    res
      .status(201)
      .json({ message: "Category created successfully", category });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get All Categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find().populate(
      "parentCategoryId",
      "categoryName"
    );
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
