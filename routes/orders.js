import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// ✅ Create new order
router.post("/", async (req, res) => {
  try {
    const { userId, items, totalAmount } = req.body;

    if (!userId || !items || items.length === 0 || !totalAmount) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const order = new Order({
      userId,
      items,
      totalAmount,
      status: "pending",
    });

    await order.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("❌ Error placing order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to place order",
      error: error.message,
    });
  }
});

// ✅ Get user’s orders
router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({
      createdAt: -1,
    });
    res.json({ success: true, orders });
  } catch (error) {
    console.error("❌ Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
});

export default router;
