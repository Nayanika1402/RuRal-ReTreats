const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  homestay: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Homestay',
    required: true
  },
  bookingDetails: {
    checkIn: {
      type: Date,
      required: true
    },
    checkOut: {
      type: Date,
      required: true
    },
    guests: {
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
    roomType: {
      type: String,
      enum: ['deluxe', 'suite', 'cottage', 'villa'],
      required: true
    }
  },
  pricing: {
    baseAmount: Number,
    amenitiesAmount: Number,
    gstAmount: Number,
    totalAmount: {
      type: Number,
      required: true
    }
  },
  specialRequests: String,
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  referenceNumber: {
    type: String,
    unique: true,
    required: true
  }
}, {
  timestamps: true
});


// Generate reference number before saving
bookingSchema.pre('save', function (next) {
  if (!this.referenceNumber) {
    this.referenceNumber = 'BK' + Math.floor(100000 + Math.random() * 900000);
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
