const express = require('express');
const router = express.Router();
const predictionsData = require('../data/predictionsData');

// @route   GET /api/predictions
// @desc    Get all predictions
// @access  Public
router.get('/', (req, res) => {
  try {
    const { matchType } = req.query;

    let filteredPredictions = [...predictionsData];

    // Filter by match type if provided
    if (matchType && matchType !== 'ALL') {
      filteredPredictions = filteredPredictions.filter(
        pred => pred.matchType === matchType.toUpperCase()
      );
    }

    res.status(200).json({
      success: true,
      count: filteredPredictions.length,
      data: filteredPredictions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching predictions',
      error: error.message
    });
  }
});

// @route   GET /api/predictions/:id
// @desc    Get single prediction by ID
// @access  Public
router.get('/:id', (req, res) => {
  try {
    const prediction = predictionsData.find(p => p.id === parseInt(req.params.id));

    if (!prediction) {
      return res.status(404).json({
        success: false,
        message: 'Prediction not found'
      });
    }

    res.status(200).json({
      success: true,
      data: prediction
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching prediction',
      error: error.message
    });
  }
});

// @route   GET /api/predictions/upcoming/matches
// @desc    Get predictions for upcoming matches only
// @access  Public
router.get('/upcoming/matches', (req, res) => {
  try {
    // In a real app, you'd filter by date
    // For now, return all predictions as "upcoming"
    res.status(200).json({
      success: true,
      count: predictionsData.length,
      data: predictionsData,
      message: 'These are AI-powered predictions for upcoming matches'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching upcoming predictions',
      error: error.message
    });
  }
});

module.exports = router;