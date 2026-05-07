const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Error:', err));

// Routes
app.use('/api/slots', require('./routes/slots'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/payments', require('./routes/payments'));

// Basic test route
app.get('/', (req, res) => {
  res.json({ message: '🅿 Smart Parking API is running!' });
});

// Socket.io - realtime slot updates
io.on('connection', (socket) => {
  console.log('📡 AI Device / Client connected:', socket.id);

  socket.on('slot-update', (data) => {
    console.log('Slot update received:', data);
    io.emit('slot-update', data);
  });

  socket.on('disconnect', () => {
    console.log('🔌 Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});