const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session'); // Import express-session
const cors = require('cors');
require('dotenv').config(); // Load environment variables
const passport = require('passport'); // Import passport
const app = express();
app.use(cors());
app.use(express.json()); // This replaces the need for bodyParser.json()

app.use(session({
  secret: process.env.SESSION_SECRET , // Use a strong secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));
app.use(passport.initialize()); // Initialize passport
app.use(passport.session());
// Set up MongoDB connection
const mongoURI = process.env.MONGODB_URI; // Use environment variable for MongoDB URI
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use route handlers
const registerRouter = require('./routes/register');
app.use('/register', registerRouter);

const loginRouter = require('./routes/login');
app.use('/login', loginRouter);

const forgotPasswordRouter = require('./routes/forgetpassword'); // Ensure the filename matches
app.use('/forgot_password', forgotPasswordRouter);

const contestRouter = require('./routes/contest');
app.use('/contest', contestRouter);
const googleLogin = require('./routes/GoogleLogin');
app.use('/google_auth', googleLogin);

const facebookLogin = require('./routes/FacebookLogin');
app.use('/facebook_auth', facebookLogin);
// Route to check if session is active
app.get('/check-session', (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ message: 'Session is active', user: req.user });
  } else {
    res.status(401).json({ message: 'Session expired or user not authenticated' });
  }
});
app.get('/logout', (req, res) => {
  req.logout();  // For Passport.js, log out the user
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }
    res.clearCookie('connect.sid');  // Clear the session cookie
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

// Start the server
const PORT = process.env.PORT || 5000; // Allow PORT to be set in the environment
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
