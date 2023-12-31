// models/Note.js

const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  description: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the User collection
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
