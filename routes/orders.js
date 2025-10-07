import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// ✅ Place a new order
router.post("/", async (req, res) => {
  try {
    const { userId, items, totalAmount, address, paymentMethod } = req.body;

    if (!userId || !items || !totalAmount) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const order = new Order({
      userId,
      items,
      totalAmount,
      address,
      paymentMethod: paymentMethod || "COD",
      status: "Pending",
      createdAt: new Date(),
    });

    await order.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

// ✅ Get all orders (for admin)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().populate("userId", "name email");
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

// ✅ Get orders by user ID
router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

export default router;
