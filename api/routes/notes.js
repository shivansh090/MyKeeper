// routes/notes.js

const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// Create a new note for a user

router.post('/:userId/notes', async (req, res) => {
  try {
    const { heading, description } = req.body;
    const userId = req.params.userId;

    const newNote = await Note.create({
      heading,
      description,
      user: userId, // Associate the note with the user's ID
    });

    res.status(201).json(newNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fetch notes for a user
router.get('/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
  
      const notes = await Note.find({ user: userId }).populate('user', 'username email');
  
      res.status(200).json(notes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;
