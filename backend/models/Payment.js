const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  slotNumber: { type: String, required: true },
  licensePlate: { type: String, required: true },
  entryTime: { type: Date, required: true },
  exitTime: { type: Date, required: true },
  duration: { type: Number },
  amount: { type: Number, required: true },
  paymentMethod: { 
    type: String, 
    enum: ['UPI', 'subscription'], 
    default: 'UPI' 
  },
  paymentStatus: { 
    type: String, 
    enum: ['pending', 'completed', 'failed'], 
    default: 'pending' 
  },
  transactionId: { type: String, default: null }
}, { timestamps: true });

module.exports = mongoose.model('Payment', PaymentSchema);