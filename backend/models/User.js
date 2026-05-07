const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['user', 'admin'], 
    default: 'user' 
  },
  licensePlates: [{ type: String }],
  subscription: {
    active: { type: Boolean, default: false },
    expiryDate: { type: Date, default: null }
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);