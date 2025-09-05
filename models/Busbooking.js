const mongoose = require('mongoose');

const busBookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  journey: {
    from: {
      type: String,
      required: true,
      enum: ['Madhya Pradesh', 'Tamil Nadu', 'Uttarakhand', 'Himachal Pradesh', 'Kerala', 'Rajasthan']
    },
    to: {
      type: String,
      required: true,
      enum: ['Madhya Pradesh', 'Tamil Nadu', 'Uttarakhand', 'Himachal Pradesh', 'Kerala', 'Rajasthan']
    },
    date: {
      type: Date,
      required: true
    },
    time: {
      type: String,
      required: true
    }
  },
  busDetails: {
    type: {
      type: String,
      enum: ['AC', 'Non-AC', 'Sleeper'],
      required: true
    },
    amenities: [{
      type: String,
      enum: ['WiFi', 'Food', 'Seats', 'Entertainment', 'Charging', 'Restrooms']
    }]
  },
  passengers: {
    adults: {
      type: Number,
      required: true,
      min: 1
    },
    children: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  pricing: {
    baseFare: Number,
    amenitiesCost: Number,
    gstAmount: Number,
    totalAmount: {
      type: Number,
      required: true
    }
  },
  pnr: {
    type: String,
    unique: true,
    required: true
  },
  status: {
    type: String,
    enum: ['confirmed', 'cancelled', 'completed'],
    default: 'confirmed'
  }
}, {
  timestamps: true
});


// Generate PNR before saving
busBookingSchema.pre('save', function (next) {
  if (!this.pnr) {
    this.pnr = 'PNR' + Math.floor(100000 + Math.random() * 900000);
  }
  next();
});

module.exports = mongoose.model('BusBooking', busBookingSchema);
