require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const User = require('./models/User');
app.use(cors());

// Import routes
const usersRouter = require('./routes/users');
const notesRouter = require('./routes/notes');
app.use(express.json())

// MONGODB Connection
mongoose.connect(process.env.MONGOOSE_URL);

// Routes
app.use('/users', usersRouter);
app.use('/notes', notesRouter);

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username, password });
  
      if (user) {
        // Successful login
        res.json({ success: true, message: 'User is successfully logged in' });
      } else {
        // Invalid credentials
        res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });
  
app.get('/allusers',async(req,res)=>{
   const data= await User.find();
    res.send(data);
})
app.get('/api/users', async (req, res) => {
    try {
      const { username } = req.query;
  
      // Find user by username
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Respond with user data
      res.status(200).json({
        userId: user._id, // or any other user data you want to send
        username: user.username,
        email: user.email,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

app.listen(3030,()=>{console.log("Server started at port 3030")})