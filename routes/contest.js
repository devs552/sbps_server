const express = require('express');
const Contest = require('../models/Contest');
const authenticateToken = require('../authenticate/authenticateToken'); // Import JWT middleware
const router = express.Router();

// Contest creation endpoint (Protected)
router.post('/create', authenticateToken, async (req, res) => {
    const { contestData } = req.body;
    
    const {
        ContestName,
        TopTeamLabel,
        LeftTeamLabel,
        square,
        email,
        rules,
        paymentMethod,
        PlayerPassword,
        contextImage,
        prizeInfo
    } = contestData;

    // Check if a contest with the same email or unique fields already exists
    const existingContest = await Contest.findOne({ email });
  
    if (existingContest) {
        return res.status(400).json({ message: 'A contest with this email already exists' });
    }

    const newContest = new Contest({
        ContestName,
        TopTeamLabel,
        LeftTeamLabel,
        square,
        email,
        rules,
        paymentMethod,
        PlayerPassword,
        contextImage,
        prizeInfo
    });

    try {
        await newContest.save();
        res.status(201).json({ message: 'Contest created successfully' });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Duplicate entry detected (email, rules, payment method, or prize info)' });
        }
        console.error('Error:', error);
        res.status(500).json({ message: 'An error occurred while creating the contest' });
    }
});

// View All Contests (Protected)
router.get('/view', authenticateToken, async (req, res) => {
    try {
        const contests = await Contest.find();
        res.status(200).json(contests);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'An error occurred while retrieving contests' });
    }
});

// Search Contest by specific field (Protected)
router.get('/search', authenticateToken, async (req, res) => {
    const { ContestName, email, TopTeamLabel } = req.query;

    try {
        let query = {};
        if (ContestName) {
            query.ContestName = ContestName;
        }
        if (email) {
            query.email = email;
        }
        if (TopTeamLabel) {
            query.TopTeamLabel = TopTeamLabel;
        }

        const contests = await Contest.find(query);
        
        if (contests.length === 0) {
            return res.status(404).json({ message: 'No contests found matching the criteria' });
        }
        
        res.status(200).json(contests);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'An error occurred while searching for contests' });
    }
});

module.exports = router;
