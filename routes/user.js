const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming you have a User model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Middleware to verify authentication
const auth = require("../middlewares/auth");


// GET User Profile
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// UPDATE User Profile
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const updates = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Export the router
module.exports = router;
