const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  subscriptionDate: {
    type: Date,
    default: Date.now
  },
  preferences: {
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly'],
      default: 'weekly'
    },
    categories: [{
      type: String,
      enum: ['travel', 'homestay', 'adventure', 'offers']
    }]
  }
}, {
  timestamps: true
});


module.exports = mongoose.model('Newsletter', newsletterSchema);
