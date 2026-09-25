const express = require('express');
const Lesson = require('../models/Lesson');

const router = express.Router();

// Get all published lessons
router.get('/', async (req, res) => {
  try {
    const lessons = await Lesson.find({
      isPublished: true,
    }).sort({ order: 1 });

    res.json({
      success: true,
      lessons,
    });
  } catch (error) {
    console.error('Get lessons error:', error.message);

    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

// Get one lesson by ID
router.get('/:id', async (req, res) => {
  try {
    const lesson = await Lesson.findOne({
      _id: req.params.id,
      isPublished: true,
    });

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found',
      });
    }

    res.json({
      success: true,
      lesson,
    });
  } catch (error) {
    console.error('Get lesson error:', error.message);

    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

// Create a lesson
// Temporary development route.
// Later this will be protected as an admin-only route.
router.post('/', async (req, res) => {
  try {
    const {
      title,
      description,
      icon,
      content,
      category,
      order,
    } = req.body;

    if (!title || !description || !content || !category) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, content and category are required',
      });
    }

    const lesson = await Lesson.create({
      title,
      description,
      icon,
      content,
      category,
      order,
    });

    res.status(201).json({
      success: true,
      message: 'Lesson created successfully',
      lesson,
    });
  } catch (error) {
    console.error('Create lesson error:', error.message);

    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

module.exports = router;