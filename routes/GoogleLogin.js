const express = require('express');
const passport = require('passport');
const User = require('../models/User'); // Adjust the path as necessary
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const router = express.Router();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:5000/google_auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user already exists in the database
    let user = await User.findOne({ email: profile.emails[0].value });
    console.log("name here is", profile.name.familyName)
   
    if (!user) {
      // If user doesn't exist, create a new one
      const { givenName, familyName } = profile.name;
      const email = profile.emails[0].value;
      const userName = profile.displayName;
      const authtype = 1; // Or any relevant value

      // Create a new user instance using the new User(...) approach
      const newUser = new User({
        firstName: givenName,  // Ensure this matches your schema
        lastName: familyName,
        email,
        userName,
        authtype,
        password: 'N/A' // Not applicable for Google auth
      });

      // Save the new user to the database
      await newUser.save();
      user = newUser; // Set the user variable to the newly created user
    }
    
    done(null, user);
  } catch (error) {
    done(error, null);
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

// Google Authentication Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication
    res.redirect('http://localhost:3000/'); // Redirect to your desired page after successful login
  }
);

module.exports = router;
