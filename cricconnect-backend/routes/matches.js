const express = require('express');
const router = express.Router();
const matchesData = require('../data/matchesData');

// @route   GET /api/matches
// @desc    Get all matches
// @access  Public
router.get('/', (req, res) => {
  try {
    const { status, matchType } = req.query;

    let filteredMatches = [...matchesData];

    // Filter by status if provided
    if (status && status !== 'ALL') {
      filteredMatches = filteredMatches.filter(
        match => match.status === status.toUpperCase()
      );
    }

    // Filter by match type if provided
    if (matchType && matchType !== 'ALL') {
      filteredMatches = filteredMatches.filter(
        match => match.matchType === matchType.toUpperCase()
      );
    }

    res.status(200).json({
      success: true,
      count: filteredMatches.length,
      data: filteredMatches
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching matches',
      error: error.message
    });
  }
});

// @route   GET /api/matches/:id
// @desc    Get single match by ID
// @access  Public
router.get('/:id', (req, res) => {
  try {
    const match = matchesData.find(m => m.id === parseInt(req.params.id));

    if (!match) {
      return res.status(404).json({
        success: false,
        message: 'Match not found'
      });
    }

    res.status(200).json({
      success: true,
      data: match
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching match',
      error: error.message
    });
  }
});

// @route   GET /api/matches/live/count
// @desc    Get count of live matches
// @access  Public
router.get('/live/count', (req, res) => {
  try {
    const liveMatches = matchesData.filter(m => m.status === 'LIVE');

    res.status(200).json({
      success: true,
      count: liveMatches.length,
      data: {
        total: matchesData.length,
        live: liveMatches.length,
        completed: matchesData.filter(m => m.status === 'COMPLETED').length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while counting matches',
      error: error.message
    });
  }
});

module.exports = router;