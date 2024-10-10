const express = require('express');
const passport = require('passport');
const User = require('../models/User'); // Adjust the path as necessary
const FacebookStrategy = require('passport-facebook').Strategy;
const router = express.Router();

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: '/facebook_auth/facebook/callback', // Ensure this matches your Facebook API settings
  profileFields: ['id', 'emails', 'name', 'displayName'] // Ensure emails are included
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user already exists in the database
    let user = await User.findOne({ email: profile.emails[0].value });

    if (!user) {
      // If user doesn't exist, create a new one
      const newUser = new User({
        firstName: profile.name.givenName,   // First name from Facebook
        lastName: profile.name.familyName,   // Last name from Facebook
        email: profile.emails[0].value,      // Email from Facebook
        userName: profile.displayName,        // Display name from Facebook
        authtype: 1,                          // Assuming 1 for social login
        password: 'N/A'                       // Not applicable for Facebook auth
      });

      // Save the new user to the database
      await newUser.save();
      user = newUser; // Set the user variable to the newly created user
    }

    done(null, user); // Pass the user object to done
  } catch (error) {
    done(error, null); // Handle errors
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Facebook Authentication Routes
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/facebook/callback', 
  passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication
    res.redirect('http://localhost:3000/'); // Redirect to your desired page after successful login
  }
);

module.exports = router;
