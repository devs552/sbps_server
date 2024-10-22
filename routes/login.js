const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User'); // Adjust the path to your User model as necessary
const bcrypt = require('bcryptjs');

const router = express.Router();

// Initialize Passport Local Strategy
passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return done(null, false, { message: 'No user found with that email' });
      }
      let isMatch = false
      // Compare the password with the hashed password
      if(password === user.password){
        isMatch=true;
      }
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password' });
      }

      // Successful authentication
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

// Serialize user into session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Login Route
router.post('/', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: 'Server error', error: err });
    }
    if (!user) {
      return res.status(401).json({ message: info.message || 'Unauthorized' }); // Send Unauthorized status
    }

    // Manually log in the user after successful authentication
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Login failed', error: err });
      }

      // Login success
      return res.status(200).json({ message: 'Login successful', user });
    });
  })(req, res, next);
});

module.exports = router;
