const mongoose = require('mongoose');
const express = require('express');
<<<<<<< HEAD
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
=======
const bodyParser = require('body-parser');
const cors = require('cors');



const app = express();
app.use(bodyParser.json());
app.use(cors());

// Set up MongoDB connection and user routes here
mongoose.connect('mongodb+srv://admin1:admin2@cluster0.ru3opcr.mongodb.net/', {
>>>>>>> 04a69ebb558c4573901308209de7806805023681
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
<<<<<<< HEAD
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
=======
  .catch(err => console.log(err));

  const apiRouter = require('./routes/register');
app.use('/register',apiRouter)
const login = require('./routes/login');
app.use('/login',login)
const contest = require('.//routes/contest');
app.use('/contest', contest)




const PORT = 5000;
>>>>>>> 04a69ebb558c4573901308209de7806805023681
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
