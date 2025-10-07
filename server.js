import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import orderRoutes from "./routes/orders.js";
import feedbackRoutes from "./routes/feedback.js";


dotenv.config(); // ✅ Load environment variables early

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/feedback", feedbackRoutes);


// ✅ Test route (optional)
app.get("/", (req, res) => {
  res.send("🚀 Backend API is running successfully!");
});

// ✅ Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
