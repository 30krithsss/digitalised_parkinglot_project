# 🅿 AI Smart Parking Lot System - Setup Guide

## ✅ Prerequisites
- **Node.js** (v16+) - [Download](https://nodejs.org)
- **MongoDB** (Community Edition) - [Download](https://www.mongodb.com/try/download/community)
- **npm** (comes with Node.js)

---

## 🚀 Quick Start (3 Steps)

### Step 1: Start MongoDB
**Option A: Using MongoDB Compass or Command Line**
```bash
# If MongoDB is installed, start the service:
mongod
```
You should see: `Listening on 127.0.0.1:27017`

**Option B: Using MongoDB Atlas (Cloud)**
- Update `backend/.env` with your connection string:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/iot-parking-lot
```

---

### Step 2: Start Backend Server (Terminal 1)
```bash
cd backend
npm install    # First time only
npm run dev    # Start with nodemon (auto-reload)
```
✅ **Backend running on:** `http://localhost:5000`

You should see:
```
✅ MongoDB Connected
🚀 Server running on http://localhost:5000
```

---

### Step 3: Start Frontend (Terminal 2)
```bash
cd frontend
npm install    # First time only
npm start      # Starts on port 3000
```
✅ **Frontend running on:** `http://localhost:3000`

Browser will auto-open with the React app.

---

## 🌱 Seed Database (Terminal 3 - Optional)
Once both servers are running:
```bash
curl -X POST http://localhost:5000/api/slots/seed/all
```
Or use the provided batch file:
```bash
seed_database.bat
```

This creates **100 parking slots** across 10 zones (A-J):
- Zones: A, B, C, D, E, F, G, H, I, J
- Slots per zone: 10
- All slots start as `available`

---

## 🌐 Access Points

| Feature | URL | Port |
|---------|-----|------|
| **Backend API** | `http://localhost:5000` | 5000 |
| **Frontend App** | `http://localhost:3000` | 3000 |
| **3D Dashboard** | `http://localhost:3000/dashboard` | 3000 |
| **AI OCR Entry** | `http://localhost:3000/entry` | 3000 |
| **Payment System** | `http://localhost:3000/payment` | 3000 |
| **Admin Panel** | `http://localhost:3000/admin` | 3000 |
| **Public Kiosk** | `http://localhost:3000/display` | 3000 |

---

## 📁 Project Structure
```
digitalised_parkinglot_project/
├── backend/              # Express.js API + Socket.io
│   ├── models/          # Mongoose schemas (Slot, User, Payment)
│   ├── routes/          # API endpoints
│   ├── services/        # Business logic
│   ├── server.js        # Main server
│   └── .env             # Environment variables
├── frontend/            # React 19 + Three.js
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
│   └── package.json
├── database/            # MongoDB scripts
├── iot-firmware/        # ESP32 code (simulated)
├── run_backend.bat      # Quick start backend
├── run_frontend.bat     # Quick start frontend
└── seed_database.bat    # Initialize DB

```

---

## 🗄️ MongoDB Database Schema

### Slots Collection
```javascript
{
  slotNumber: "A-01",           // Unique identifier
  zone: "A",                    // Zone A-J
  status: "available",          // available, occupied, reserved
  licensePlate: null,           // Car license plate (if occupied)
  entryTime: null,              // When car entered
  exitTime: null,               // When car left
  timestamps: { ... }           // Created/updated timestamps
}
```

### Users Collection
```javascript
{
  email: "user@example.com",
  password: "hashed_password",
  role: "user",                 // user or admin
  subscription: "premium"       // free or premium
}
```

### Payments Collection
```javascript
{
  userId: "...",
  slotNumber: "A-01",
  entryTime: "2024-01-01T08:00",
  exitTime: "2024-01-01T10:30",
  duration: 2.5,                // hours
  rate: 20,                     // ₹/hour
  peakMultiplier: 1.5,          // 1.5x during 8-10AM, 5-8PM
  totalAmount: 75,              // ₹
  status: "paid"                // pending, paid
}
```

---

## ⚙️ Environment Configuration

### Backend `.env` (already configured)
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/iot-parking-lot
JWT_SECRET=smartpark_secret_key_2024
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_app_password
```

### Key API Endpoints

**Slots:**
- `GET /api/slots` - List all slots
- `GET /api/slots/:slotNumber` - Get single slot
- `PUT /api/slots/:slotNumber` - Update slot status
- `POST /api/slots/seed/all` - Create 100 demo slots

**Auth:**
- `POST /api/auth/register` - Create user account
- `POST /api/auth/login` - User login (returns JWT)

**Payments:**
- `POST /api/payments/bill` - Calculate parking bill
- `GET /api/payments/:id` - Get payment record

---

## 🎯 Real-Time Features (Socket.io)

The system uses WebSocket for live updates:

**Events:**
- `slot-update` - When a slot status changes
- `payment-update` - New payment processed
- `occupancy-change` - Live occupancy percentage

These trigger auto-refresh on the 3D Dashboard & Admin Panel.

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
❌ MongoDB Error: connect ECONNREFUSED
```
**Solution:**
1. Start MongoDB: `mongod` (or MongoDB Compass)
2. Check connection string in `.env`
3. Ensure port 27017 is not blocked

### Port Already in Use
```
Port 5000/3000 already in use
```
**Solution:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process
taskkill /PID <PID> /F
```

### Dependencies Missing
```bash
cd backend && npm install
cd ../frontend && npm install
```

### CORS Error in Frontend
Ensure backend `server.js` has:
```javascript
cors: { origin: '*', methods: ['GET', 'POST'] }
```

---

## 📊 Features Overview

✅ **AI Parking Detection** - OCR license plate recognition  
✅ **3D Dashboard** - Real-time slot visualization (Three.js)  
✅ **Smart Locks** - Simulated IoT control  
✅ **Dynamic Pricing** - Peak hour rates (₹20-30/hr)  
✅ **Real-time Updates** - Socket.io live sync  
✅ **Admin Controls** - Override, analytics, reports  
✅ **Voice Commands** - Web Speech API  
✅ **Notifications** - Email confirmations  
✅ **JWT Authentication** - Secure user sessions  

---

## 🚀 Next Steps
1. Open 3D Dashboard: `http://localhost:3000/dashboard`
2. Try OCR Entry: `http://localhost:3000/entry`
3. Test Payment: `http://localhost:3000/payment`
4. Admin Panel: `http://localhost:3000/admin`

**Built with:** React 19, Three.js, Node.js, Express, MongoDB, Socket.io

---
