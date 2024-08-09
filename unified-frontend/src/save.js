// routes/save.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const mongoose = require('mongoose');
const POI = mongoose.model('POI');
const Guide = mongoose.model('Guide');

router.post('/pois', authMiddleware, async (req, res) => {
    const data = req.body;
    const userId = req.user.id;

    try {
        const newPOI = new POI({ ...data, userId });
        await newPOI.save();
        res.status(200).json({ message: 'POI saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to save POI', error });
    }
});

router.post('/guides', authMiddleware, async (req, res) => {
    const data = req.body;
    const userId = req.user.id;

    try {
        const newGuide = new Guide({ ...data, userId });
        await newGuide.save();
        res.status(200).json({ message: 'Guide saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to save guide', error });
    }
});

module.exports = router;
