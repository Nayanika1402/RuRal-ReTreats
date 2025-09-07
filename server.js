require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const paymentRoutes = require('./routes/payment');
const authRoutes = require('./routes/auth');
const passport = require('passport');
const session = require('express-session');
require('./config/passport'); // Google OAuth strategy

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:3001', 
      'http://127.0.0.1:3001', 
      'http://localhost:5502', 
      'http://localhost:5500', 
      'http://127.0.0.1:5500', 
      'http://127.0.0.1:5502'
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1 || origin === 'null') {
      return callback(null, true);
    }
    
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

// Sessions for Google OAuth
app.use(session({
  secret: process.env.SESSION_SECRET || 'supersecret',
  resave: false,
  saveUninitialized: true,
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// For webhook endpoint - raw body needed
app.use('/api/payments/webhook', express.raw({ type: 'application/json' }));

// For other endpoints
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('.'));

// Routes
app.use('/api/payments', paymentRoutes);
app.use('/api/auth', authRoutes);

// Google OAuth routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful auth
    res.redirect('/dashboard'); 
  }
);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
