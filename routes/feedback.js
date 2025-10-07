import express from 'express';
import Feedback from '../models/Feedback.js';

const router = express.Router();

// Submit feedback
router.post('/', async (req, res) => {
  try {
    const { name, email, message, rating } = req.body;

    const feedback = new Feedback({
      name,
      email,
      message,
      rating
    });

    await feedback.save();

    res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully',
      feedback
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Get all feedback (for admin)
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      feedbacks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

export default router;