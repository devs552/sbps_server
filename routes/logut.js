const express = require('express');
const User = require('../models/User');
const router = express.Router();
router.post('/logout', (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: 'Logout failed' });
      }
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ message: 'Could not log out' });
        }
        res.json({ message: 'Logout successful' });
      });
    });
  });
  module.exports = router;
 