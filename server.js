import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import orderRoutes from "./routes/orders.js";
import feedbackRoutes from "./routes/feedback.js";

// ✅ Load environment variables
dotenv.config();

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000", // Local frontend
      "https://jn-electronics-frontend.onrender.com", // Render frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ MongoDB Connection
const mongoURI =
  process.env.MONGO_URI ||
  "mongodb://localhost:27017/jnshop"; // Fallback for local dev

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/feedback", feedbackRoutes);

// ✅ Root Route (for Render check)
app.get("/", (req, res) => {
  res.send("🚀 Backend API is running successfully!");
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
