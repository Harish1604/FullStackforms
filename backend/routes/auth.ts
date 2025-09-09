import express from "express";
import bcrypt from "bcryptjs";
import Supplier from "../models/supplier";

const router = express.Router();

// Supplier Registration
router.post("/register", async (req, res) => {
  const { name, email, phone, password, product } = req.body;

  try {
    const existing = await Supplier.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Supplier already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const supplier = new Supplier({
      name,
      email,
      phone,
      password: hashedPassword,
      product,
    });

    await supplier.save();
    res
      .status(201)
      .json({ message: "Supplier registered successfully", supplier });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
