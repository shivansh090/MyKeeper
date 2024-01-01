const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Route to get user details by username
router.get('/:username', async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to create a new user
router.post('/Signup', async (req, res) => {

    try {
      const { username, email, password } = req.body;
  
      // Check if the username or email is already in use
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return res.status(400).json({ success:false, message: 'Username or email is already in use' });
      }
  
      // Create a new user
      const newUser = await User.create({
        username,
        email,
        password, // Note: You should hash the password before saving it in a real-world application
      });
  
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ success:false, message: 'Internal Server Error' });
    }
  });

module.exports = router;
