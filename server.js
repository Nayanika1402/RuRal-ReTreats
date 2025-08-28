require('dotenv').config(); // ← Load environment variables

const express = require('express');
const connectDB = require('./config/database');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.static('public')); // Serve static files from 'public' folder

// Test Route: Display Output in Browser
app.get('/', (req, res) => {
  res.send(`
    <h1>🎉 Rural Retreats Backend</h1>
    <p>Server is running and connected to MongoDB!</p>
    <ul>
      <li><a href="/homestays.html">Go to Homestays Page</a></li>
      <li><a href="/api/test">View Test Data from DB</a></li>
    </ul>
  `);
});

// API Route: Send test data from DB
app.get('/api/test', async (req, res) => {
  try {
    const data = await mongoose.connection.db.collection('test').findOne();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});