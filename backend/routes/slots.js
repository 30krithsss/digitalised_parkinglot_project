const express = require('express');
const router = express.Router();
const Slot = require('../models/Slot');

// Get all slots
router.get('/', async (req, res) => {
  try {
    const slots = await Slot.find();
    res.json(slots);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single slot
router.get('/:slotNumber', async (req, res) => {
  try {
    const slot = await Slot.findOne({ slotNumber: req.params.slotNumber });
    if (!slot) return res.status(404).json({ message: 'Slot not found' });
    res.json(slot);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update slot status (called by IoT sensor)
router.put('/:slotNumber', async (req, res) => {
  try {
    const { status, licensePlate, entryTime, exitTime } = req.body;
    const slot = await Slot.findOneAndUpdate(
      { slotNumber: req.params.slotNumber },
      { status, licensePlate, entryTime, exitTime },
      { new: true }
    );
    res.json(slot);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Seed 100 slots into database
router.post('/seed/all', async (req, res) => {
  try {
    await Slot.deleteMany();
    const zones = ['A','B','C','D','E','F','G','H','I','J'];
    const slots = [];
    zones.forEach(zone => {
      for (let i = 1; i <= 10; i++) {
        slots.push({
          slotNumber: `${zone}-${String(i).padStart(2,'0')}`,
          zone: zone,
          status: 'available'
        });
      }
    });
    await Slot.insertMany(slots);
    res.json({ message: '✅ 100 slots created successfully!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;