const express = require('express');
const Progress = require('../models/Progress');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get all progress for the logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const progress = await Progress.find({
      user: req.userId,
    })
      .populate('lesson', 'title description icon category')
      .sort({ updatedAt: -1 });

    res.json({
      success: true,
      progress,
    });
  } catch (error) {
    console.error('Get progress error:', error.message);

    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

module.exports = router;