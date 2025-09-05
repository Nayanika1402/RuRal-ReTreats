const mongoose = require('mongoose');

const homestaySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Homestay name is required'],
    trim: true
  },
  location: {
    state: {
      type: String,
      required: true,
      enum: ['Rajasthan', 'Kerala', 'Himachal Pradesh', 'Uttarakhand', 'Tamil Nadu', 'Madhya Pradesh']
    },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    },
    address: String
  },
  pricing: {
    basePrice: {
      type: Number,
      required: true,
      min: [0, 'Price cannot be negative']
    },
    currency: {
      type: String,
      default: 'INR'
    }
  },
  accommodations: {
    bedrooms: {
      type: Number,
      required: true,
      min: 1
    },
    maxGuests: {
      type: Number,
      required: true,
      min: 1
    },
    roomTypes: [{
      type: String,
      enum: ['deluxe', 'suite', 'cottage', 'villa']
    }]
  },
  amenities: [{
    type: String,
    enum: ['WiFi', 'Food', 'Seats', 'Entertainment', 'Charging', 'Restrooms']
  }],
  images: [String],
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  availability: {
    type: String,
    enum: ['available', 'booked', 'maintenance'],
    default: 'available'
  },
  description: String,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});


module.exports = mongoose.model('Homestay', homestaySchema);
