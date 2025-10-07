import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      name: String,
      quantity: Number,
      price: Number,
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["COD", "Card", "UPI"],
    default: "COD",
  },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Shipped", "Delivered"],
    default: "Pending",
  },
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
