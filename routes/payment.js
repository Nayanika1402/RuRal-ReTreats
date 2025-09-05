const express = require('express');
const crypto = require('crypto');
const mongoose = require('mongoose');
const razorpay = require('../config/razorpay');
const Payment = require('../models/Payment');
const Booking = require('../models/Booking');
const BusBooking = require('../models/Busbooking');

const router = express.Router();

// Create Razorpay Order
router.post('/create-order', async (req, res) => {
  try {
    console.log('Received payment request:', req.body);
    const { amount, currency = 'INR', bookingType, bookingDetails, customerDetails } = req.body;

    // Validate required fields
    if (!amount || !bookingType || !customerDetails) {
      console.log('Missing required fields:', { amount, bookingType, customerDetails });
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Create Razorpay order
    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency,
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1
    };

    console.log('Creating Razorpay order with options:', options);
    const order = await razorpay.orders.create(options);
    console.log('Razorpay order created successfully:', order.id);

    // Save payment record
    const payment = new Payment({
      razorpayOrderId: order.id,
      amount: amount,
      currency,
      bookingType,
      customerDetails,
      status: 'created'
    });

    await payment.save();

    res.json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        key_id: process.env.RAZORPAY_KEY_ID
      },
      customerDetails
    });

  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message
    });
  }
});

// Verify Payment
router.post('/verify-payment', async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingDetails
    } = req.body;

    // Generate signature for verification
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // Payment is valid
      const payment = await Payment.findOne({ razorpayOrderId: razorpay_order_id });
      
      if (!payment) {
        return res.status(404).json({
          success: false,
          message: 'Payment record not found'
        });
      }

      // Update payment record
      payment.razorpayPaymentId = razorpay_payment_id;
      payment.razorpaySignature = razorpay_signature;
      payment.status = 'captured';
      await payment.save();

      // Create booking based on type
      let bookingResult;
      
      if (payment.bookingType === 'homestay') {
        const booking = new Booking({
          user: bookingDetails.userId || new mongoose.Types.ObjectId(),
          homestay: bookingDetails.homestayId || new mongoose.Types.ObjectId(),
          bookingDetails: bookingDetails.details || {
            checkIn: new Date(),
            checkOut: new Date(Date.now() + 24 * 60 * 60 * 1000),
            guests: { adults: 1, children: 0 },
            roomType: 'deluxe'
          },
          pricing: bookingDetails.pricing,
          specialRequests: bookingDetails.specialRequests || '',
          status: 'confirmed'
        });
        bookingResult = await booking.save();
        
      } else if (payment.bookingType === 'bus') {
        const busBooking = new BusBooking({
          user: bookingDetails.userId || new mongoose.Types.ObjectId(),
          journey: bookingDetails.journey || {
            from: 'Madhya Pradesh',
            to: 'Tamil Nadu',
            date: new Date(),
            time: '10:00 AM'
          },
          busDetails: bookingDetails.busDetails || {
            type: 'AC',
            amenities: ['WiFi', 'Food']
          },
          passengers: bookingDetails.passengers || { adults: 1, children: 0 },
          pricing: bookingDetails.pricing,
          status: 'confirmed'
        });
        bookingResult = await busBooking.save();
      }

      // Update payment with booking reference
      payment.bookingId = bookingResult._id;
      await payment.save();

      res.json({
        success: true,
        message: 'Payment verified successfully',
        bookingReference: bookingResult.referenceNumber || bookingResult.pnr,
        bookingId: bookingResult._id
      });

    } else {
      // Payment verification failed
      const payment = await Payment.findOne({ razorpayOrderId: razorpay_order_id });
      if (payment) {
        payment.status = 'failed';
        payment.failureReason = 'Signature verification failed';
        await payment.save();
      }

      res.status(400).json({
        success: false,
        message: 'Payment verification failed'
      });
    }

  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({
      success: false,
      message: 'Payment verification error',
      error: error.message
    });
  }
});

// Handle payment failure
router.post('/payment-failed', async (req, res) => {
  try {
    const { razorpay_order_id, error } = req.body;
    
    const payment = await Payment.findOne({ razorpayOrderId: razorpay_order_id });
    if (payment) {
      payment.status = 'failed';
      payment.failureReason = error.description || 'Payment failed';
      await payment.save();
    }

    res.json({
      success: true,
      message: 'Payment failure recorded'
    });

  } catch (error) {
    console.error('Error handling payment failure:', error);
    res.status(500).json({
      success: false,
      message: 'Error handling payment failure'
    });
  }
});

// Get payment status
router.get('/status/:orderId', async (req, res) => {
  try {
    const payment = await Payment.findOne({ razorpayOrderId: req.params.orderId });
    
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    res.json({
      success: true,
      payment: {
        status: payment.status,
        amount: payment.amount,
        currency: payment.currency,
        bookingType: payment.bookingType,
        createdAt: payment.createdAt
      }
    });

  } catch (error) {
    console.error('Error fetching payment status:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching payment status'
    });
  }
});

// Webhook endpoint for Razorpay events
router.post('/webhook', (req, res) => {
  try {
    const webhookSignature = req.headers['x-razorpay-signature'];
    const webhookBody = JSON.stringify(req.body);
    
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(webhookBody)
      .digest('hex');

    if (webhookSignature === expectedSignature) {
      const event = req.body.event;
      const paymentEntity = req.body.payload.payment.entity;
      
      // Handle different webhook events
      switch (event) {
        case 'payment.captured':
          handlePaymentCaptured(paymentEntity);
          break;
        case 'payment.failed':
          handlePaymentFailed(paymentEntity);
          break;
        // Add more event handlers as needed
      }
      
      res.json({ status: 'ok' });
    } else {
      res.status(400).json({ error: 'Invalid signature' });
    }

  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

async function handlePaymentCaptured(paymentEntity) {
  try {
    const payment = await Payment.findOne({ razorpayOrderId: paymentEntity.order_id });
    if (payment && payment.status !== 'captured') {
      payment.status = 'captured';
      payment.razorpayPaymentId = paymentEntity.id;
      await payment.save();
      console.log(`Payment captured: ${paymentEntity.id}`);
    }
  } catch (error) {
    console.error('Error handling payment captured:', error);
  }
}

async function handlePaymentFailed(paymentEntity) {
  try {
    const payment = await Payment.findOne({ razorpayOrderId: paymentEntity.order_id });
    if (payment) {
      payment.status = 'failed';
      payment.failureReason = paymentEntity.error_description || 'Payment failed';
      await payment.save();
      console.log(`Payment failed: ${paymentEntity.id}`);
    }
  } catch (error) {
    console.error('Error handling payment failure:', error);
  }
}

module.exports = router;