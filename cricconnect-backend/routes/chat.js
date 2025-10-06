const express = require('express');
const router = express.Router();
const ChatMessage = require('../models/ChatMessage');

// @route   GET /api/chat
// @desc    Get all chat messages
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { limit = 100, page = 1 } = req.query;

    const messages = await ChatMessage.find()
      .sort({ timestamp: -1 }) // Latest first
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await ChatMessage.countDocuments();

    res.status(200).json({
      success: true,
      count: messages.length,
      total: total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: messages.reverse() // Reverse to show oldest first in UI
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching chat messages',
      error: error.message
    });
  }
});

// @route   POST /api/chat
// @desc    Create a new chat message
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { username, message, isOwn } = req.body;

    // Validation
    if (!username || !message) {
      return res.status(400).json({
        success: false,
        message: 'Username and message are required'
      });
    }

    if (message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Message cannot be empty'
      });
    }

    // Create new chat message
    const chatMessage = await ChatMessage.create({
      username: username.trim(),
      message: message.trim(),
      isOwn: isOwn || false,
      timestamp: new Date()
    });

    res.status(201).json({
      success: true,
      message: 'Chat message created successfully',
      data: chatMessage
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: messages
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while creating chat message',
      error: error.message
    });
  }
});

// @route   DELETE /api/chat/:id
// @desc    Delete a chat message
// @access  Public (should be protected in production)
router.delete('/:id', async (req, res) => {
  try {
    const message = await ChatMessage.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Chat message not found'
      });
    }

    await message.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Chat message deleted successfully',
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while deleting chat message',
      error: error.message
    });
  }
});

// @route   GET /api/chat/stats
// @desc    Get chat statistics
// @access  Public
router.get('/stats/summary', async (req, res) => {
  try {
    const total = await ChatMessage.countDocuments();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayCount = await ChatMessage.countDocuments({
      timestamp: { $gte: today }
    });

    const uniqueUsers = await ChatMessage.distinct('username');

    res.status(200).json({
      success: true,
      data: {
        totalMessages: total,
        todayMessages: todayCount,
        uniqueUsers: uniqueUsers.length,
        users: uniqueUsers
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching chat stats',
      error: error.message
    });
  }
});

module.exports = router;