import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// ✅ Place Order
router.post("/", async (req, res) => {
  try {
    const { userId, items, totalAmount, address, paymentMethod } = req.body;

    const order = new Order({
      userId,
      items,
      totalAmount,
      address,
      paymentMethod,
    });

    await order.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("Order Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to place order",
      error: error.message,
    });
  }
});

export default router;
