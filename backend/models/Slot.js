const mongoose = require('mongoose');

const SlotSchema = new mongoose.Schema({
  slotNumber: { type: String, required: true, unique: true },
  zone: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['available', 'occupied', 'reserved'], 
    default: 'available' 
  },
  licensePlate: { type: String, default: null },
  entryTime: { type: Date, default: null },
  exitTime: { type: Date, default: null },
  lockedBy: { type: String, default: null }
}, { timestamps: true });

module.exports = mongoose.model('Slot', SlotSchema);