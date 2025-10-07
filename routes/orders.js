import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// ✅ Place Order
router.post("/", async (req, res) => {
  try {
    const { userId, items, totalAmount } = req.body;

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
    console.error("Error placing order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to place order",
      error: error.message,
    });
  }
});

// ✅ Get Orders by User ID
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
});

export default router;
