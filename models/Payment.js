const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  razorpayOrderId: {
    type: String,
    required: true,
    unique: true
  },
  razorpayPaymentId: {
    type: String,
    sparse: true
  },
  razorpaySignature: {
    type: String,
    sparse: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'INR'
  },
  status: {
    type: String,
    enum: ['created', 'authorized', 'captured', 'refunded', 'failed'],
    default: 'created'
  },
  bookingType: {
    type: String,
    enum: ['homestay', 'bus', 'package'],
    required: true
  },
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    refPath: 'bookingType'
  },
  customerDetails: {
    name: String,
    email: String,
    phone: String
  },
  paymentMethod: String,
  failureReason: String,
  refundId: String,
  refundAmount: Number
}, {
  timestamps: true
});

module.exports = mongoose.model('Payment', paymentSchema);