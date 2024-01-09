// routes/notes.js

const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// Create a new note for a user
router.post('/:userId', async (req, res) => {
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
router.delete('/delete',async(req,res)=>{
  const itemId = req.body._id; // Assuming your item ID is stored in the "_id" field
        try {
         const item = await Note.findByIdAndDelete(itemId);
          if (!item) {
            return res.status(404).json({ error: 'Note not found' });
          }
      
          res.json({ success: true, deletedNote: item });
        } catch (error) {
          console.error('Error during deletion:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
})
module.exports = router;
