const express = require('express');
const User = require('../models/User');
const router = express.Router();
<<<<<<< HEAD
=======

>>>>>>> 04a69ebb558c4573901308209de7806805023681
router.post('/', async (req, res) => {
  const { loginData} = req.body;
  const email= loginData.email;
  const password = loginData.password;
<<<<<<< HEAD

=======
>>>>>>> 04a69ebb558c4573901308209de7806805023681
  const user = await User.findOne({ email, password });
  if (user) {
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
