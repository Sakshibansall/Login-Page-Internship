//Modules
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const JWT_SECRET = 'sakshibnn'; 

const app = express();
app.use(express.json());
app.use(cors());



// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/auth_demo')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// User Model
const User = mongoose.model('User', {
  username: String,
  password: String
});

// Register page
app.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login page
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Please sign up first' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: '1h' }
    );


    res.json({ 
      message: `Login successful! Thank you, ${username}` ,
      token
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));