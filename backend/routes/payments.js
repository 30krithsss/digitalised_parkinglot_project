const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');

// Calculate amount based on duration with dynamic peak pricing
function calculateAmount(entryTime, exitTime) {
  const diffMs = new Date(exitTime) - new Date(entryTime);
  const hours = Math.ceil(diffMs / (1000 * 60 * 60));
  let base = 20;
  if (hours <= 1) base = 20;
  if (hours <= 2) base = 30;
  if (hours <= 3) base = 40;
  else base = 40 + (hours - 3) * 10;

  // Dynamic peak multiplier (8AM-10AM, 5PM-8PM 1.5x)
  const exitHour = new Date(exitTime).getHours();
  const peakMultiplier = (exitHour >= 8 && exitHour <= 10) || (exitHour >= 17 && exitHour <= 20) ? 1.5 : 1.2;
  return Math.round(base * hours * peakMultiplier);
}

// Create payment
router.post('/create', async (req, res) => {
  try {
    const { slotNumber, licensePlate, entryTime, exitTime, paymentMethod, userId } = req.body;
    const amount = calculateAmount(entryTime, exitTime);
    const payment = await Payment.create({
      userId, slotNumber, licensePlate,
      entryTime, exitTime, amount,
      paymentMethod, paymentStatus: 'pending'
    });
    res.status(201).json({ payment, amount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Confirm payment
router.put('/confirm/:id', async (req, res) => {
  try {
    const { transactionId } = req.body;
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { paymentStatus: 'completed', transactionId },
      { new: true }
    );
    res.json({ message: '✅ Payment confirmed!', payment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all payments (admin)
router.get('/all', async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Dynamic pricing calculate endpoint
router.post('/calculate', (req, res) => {
  const { entryTime, exitTime } = req.body;
  const amount = calculateAmount(entryTime, exitTime);
  res.json({ amount });
});

// Get payment by license plate
router.get('/:licensePlate', async (req, res) => {
  try {
    const payments = await Payment.find({ licensePlate: req.params.licensePlate });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;