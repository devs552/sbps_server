const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/', async (req, res) => {
    const { loginData } = req.body;
const email= loginData.email;
const firstName = loginData.firstName;
const  lastName = loginData.lastName;
const  userName = loginData.userName;
const authtype = loginData.authtype;
const password= loginData.password;
    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email });
  
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
      
      
    }
  
    // If no existing user, create a new user
    const newUser = new User({ email,password, firstName, lastName, userName, authtype });
  
    try {
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
      alert('User registered successfully' )
    } catch (error) {
      if (error.code === 11000) {
        // Duplicate key error (email already exists)
        return res.status(400).json({ message: 'Email already registered' });
      alert("Email already exist");


      }
      // Other error occurred
      console.error('Error:', error);
      res.status(500).json({ message: 'An error occurred' });
    }
});

module.exports = router;
