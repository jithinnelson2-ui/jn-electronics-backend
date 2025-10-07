import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import orderRoutes from './routes/orders.js';
import feedbackRoutes from './routes/feedback.js';

dotenv.config();

const app = express();

// ✅ Middleware
app.use(express.json());

// ✅ Allow frontend (localhost:3000) to access backend (localhost:5000)
app.use(
  cors({
    origin: "http://localhost:3000", // frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jnshop')
  .then(() => console.log('✅ Connected to MongoDB: jnshop'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ API Routes
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/feedback', feedbackRoutes);

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("🚀 Backend API is running successfully!");
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
