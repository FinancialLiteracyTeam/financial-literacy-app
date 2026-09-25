const express = require('express');
const Quiz = require('../models/Quiz');
const Lesson = require('../models/Lesson');
const User = require('../models/User');
const Progress = require('../models/Progress');
const QuizAttempt = require('../models/QuizAttempt');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get quiz for a lesson
router.get('/lesson/:lessonId', async (req, res) => {
  try {
    const quiz = await Quiz.findOne({
      lesson: req.params.lessonId,
      isPublished: true,
    }).select('-questions.correctAnswer');

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found',
      });
    }

    res.json({
      success: true,
      quiz,
    });
  } catch (error) {
    console.error('Get quiz error:', error.message);

    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

// Create a quiz
// Temporary development route.
// Later this will be admin-only.
router.post('/', async (req, res) => {
  try {
    const {
      lesson,
      title,
      questions,
      xpReward,
    } = req.body;

    // Check required fields
    if (!lesson || !title || !questions || questions.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Lesson, title and questions are required',
      });
    }

    // Check that lesson exists
    const existingLesson = await Lesson.findById(lesson);

    if (!existingLesson) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found',
      });
    }

    // Check if quiz already exists for lesson
    const existingQuiz = await Quiz.findOne({ lesson });

    if (existingQuiz) {
      return res.status(400).json({
        success: false,
        message: 'Quiz already exists for this lesson',
      });
    }

    const quiz = await Quiz.create({
      lesson,
      title,
      questions,
      xpReward,
    });

    res.status(201).json({
      success: true,
      message: 'Quiz created successfully',
      quiz,
    });
  } catch (error) {
    console.error('Create quiz error:', error.message);

    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

router.put('/:quizId', async (req, res) => {
    try {
      const { title, questions, xpReward } = req.body;

      const quiz = await Quiz.findById(req.params.quizId);

      if (!quiz) {
        return res.status(404).json({
          success: false,
          message: 'Quiz not found',
        });
      }

      quiz.title = title ?? quiz.title;
      quiz.questions = questions ?? quiz.questions;
      quiz.xpReward = xpReward ?? quiz.xpReward;

      await quiz.save();

      res.json({
        success: true,
        message: 'Quiz updated successfully',
        quiz,
      });
    } catch (error) {
      console.error('Update quiz error:', error.message);

      res.status(500).json({
        success: false,
        message: 'Server error',
      });
    }
  });

router.get('/:quizId', async (req, res) => {
  try {
    const quiz = await Quiz.findOne({
      _id: req.params.quizId,
      isPublished: true,
    }).select('-questions.correctAnswer');

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found',
      });
    }

    res.json({
      success: true,
      quiz,
    });
  } catch (error) {
    console.error('Get quiz error:', error.message);

    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});


// Submit quiz
router.post('/:quizId/submit', authMiddleware, async (req, res) => {
  try {
    const { answers } = req.body;

    if (!Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        message: 'Answers must be an array',
      });
    }

    const quiz = await Quiz.findById(req.params.quizId);

    if (!quiz || !quiz.isPublished) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found',
      });
    }

    // Calculate score
    let score = 0;

    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score++;
      }
    });

    const totalQuestions = quiz.questions.length;

    const percentage = Math.round(
      (score / totalQuestions) * 100
    );

    /*
      Check whether this user has already completed
      this quiz before.
    */
    const previousAttempts = await QuizAttempt.countDocuments({
      user: req.userId,
      quiz: quiz._id,
    });

    const attemptNumber = previousAttempts + 1;

    /*
      XP is awarded ONLY on the first attempt.
    */
    const xpEarned =
      attemptNumber === 1
        ? score * 10
        : 0;

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Add XP only on first completion
    if (xpEarned > 0) {
      user.xp += xpEarned;
      user.level = Math.floor(user.xp / 100) + 1;

      await user.save();
    }

    /*
      Save this attempt in QuizAttempt.
    */
    const attempt = await QuizAttempt.create({
      user: req.userId,
      quiz: quiz._id,
      score,
      totalQuestions,
      percentage,
      xpEarned,
      attemptNumber,
    });

    /*
      Update lesson progress.
      Progress remains one record per user + lesson.
    */
    const existingProgress = await Progress.findOne({
      user: req.userId,
      lesson: quiz.lesson,
    });

    let progress;

    if (!existingProgress) {
      progress = await Progress.create({
        user: req.userId,
        lesson: quiz.lesson,
        completed: true,
        quizScore: score,
        totalQuestions,
        completedAt: new Date(),
      });
    } else {
      /*
        Keep the BEST score when the user retakes.
      */
      if (score > existingProgress.quizScore) {
        existingProgress.quizScore = score;
      }

      existingProgress.completed = true;
      existingProgress.totalQuestions = totalQuestions;
      existingProgress.completedAt = new Date();

      progress = await existingProgress.save();
    }

    res.json({
      success: true,
      message:
        attemptNumber === 1
          ? 'Quiz completed successfully'
          : 'Quiz retaken successfully',

      result: {
        score,
        totalQuestions,
        percentage,

        xpEarned,

        totalXP: user.xp,
        level: user.level,

        attemptNumber,

        isFirstAttempt: attemptNumber === 1,

        progress: {
          completed: progress.completed,
          quizScore: progress.quizScore,
          totalQuestions: progress.totalQuestions,
          completedAt: progress.completedAt,
        },
      },
    });
  } catch (error) {
    console.error('Submit quiz error:', error.message);

    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

module.exports = router;