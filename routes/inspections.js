const express = require('express');
const { authenticateToken } = require('./auth');
const Inspection = require('../models/Inspection');
const router = express.Router();

// Create inspection
router.post('/create', authenticateToken, async (req, res) => {
  try {
    const { propertyAddress, moveInDate, rooms } = req.body;
    
    const inspection = new Inspection({
      userId: req.user.userId,
      propertyAddress,
      moveInDate,
      rooms
    });
    
    await inspection.save();
    res.json(inspection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's inspections
router.get('/my-inspections', authenticateToken, async (req, res) => {
  try {
    const inspections = await Inspection.find({ userId: req.user.userId })
      .sort('-createdAt');
    res.json(inspections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;