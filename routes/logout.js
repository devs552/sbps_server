const express = require('express');
const router = express.Router();

router.post('/logout', (req, res) => {
  // Call Passport's logout method to terminate the session
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed', error: err });
    }

    // Destroy the session
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Could not destroy session', error: err });
      }

      // Clear the session cookie (key 'connect.sid' by default)
      res.clearCookie('connect.sid', { path: '/' });

      // Send a response to indicate successful logout
      res.status(200).json({ message: 'Logout successful' });
    });
  });
});


module.exports = router;
