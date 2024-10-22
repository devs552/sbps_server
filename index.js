const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session'); // Import express-session
const cors = require('cors');
require('dotenv').config(); // Load environment variables
const passport = require('passport'); // Import passport

const app = express();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  credentials: true, // Allow credentials (cookies, etc.)
}));

app.use(express.json()); // Middleware to parse JSON bodies

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET, // Use a strong secret for session security
  resave: false, // Prevent resaving sessions unnecessarily
  saveUninitialized: false, // Only save sessions when necessary
  cookie: {
    secure: false, // Set to true in production if using HTTPS
    httpOnly: true, // Prevent JavaScript access to cookies (for security)
    maxAge: 1000 * 60 * 60 * 24, // Set a suitable session expiration time (1 day here)
  }
}));

app.use(passport.initialize()); // Initialize passport
app.use(passport.session()); // Use sessions for passport

// MongoDB connection
const mongoURI = process.env.MONGODB_URI; // Use environment variable for MongoDB URI
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Route handlers
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
const sessionRouter = require('./routes/session');
app.use('/', sessionRouter);

const logoutRouter = require('./routes/logout');
app.use('/', logoutRouter);

// Start the server
const PORT = process.env.PORT || 5000; // Allow PORT to be set in the environment
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
