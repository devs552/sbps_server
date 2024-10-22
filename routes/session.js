const express = require('express');
const User = require('../models/User');
const router = express.Router()
router.get('/check-session', (req, res) => {
    if (req.isAuthenticated()) {
      res.json({ message: 'You are authenticated', user: req.user });
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  });
  module.exports = router;
