# 🅿 Smart Parking - Quick Reference

## 🚀 Start in 60 Seconds

### Terminal 1 (Backend)
```bash
cd backend
npm run dev
```
➜ http://localhost:5000

### Terminal 2 (Frontend)  
```bash
cd frontend
npm start
```
➜ http://localhost:3000

### Terminal 3 (Seed DB)
```bash
curl -X POST http://localhost:5000/api/slots/seed/all
```

---

## 📍 Quick Links

| Page | URL | What It Does |
|------|-----|-------------|
| **3D Dashboard** | localhost:3000/dashboard | View 100 slots in 3D, reserve slots, see live occupancy |
| **Entry (AI OCR)** | localhost:3000/entry | Detect car license plates, auto-assign parking |
| **Payment** | localhost:3000/payment | Calculate bill, show QR code for UPI payment |
| **Admin Panel** | localhost:3000/admin | View analytics, override locks, manage system |
| **Public Kiosk** | localhost:3000/display | Large screen display for parking lot entrance |
| **API Docs** | localhost:5000 | Backend API test endpoint |

---

## 🔧 Common Commands

```bash
# Install dependencies (first time)
cd backend && npm install
cd ../frontend && npm install

# Run backend (dev mode with auto-reload)
cd backend && npm run dev

# Run backend (production)
cd backend && npm start

# Run frontend
cd frontend && npm start

# Build frontend for production
cd frontend && npm run build

# Seed database with 100 slots
curl -X POST http://localhost:5000/api/slots/seed/all

# Reset database (delete all slots, then reseed)
# - Make a DELETE request to /api/slots (if endpoint exists)
# - Or use MongoDB compass to delete 'Slot' collection
# - Then run seed command again
```

---

## 🗄️ Database Info

**MongoDB Connection:**
- Local: `mongodb://localhost:27017/iot-parking-lot`
- Cloud: Update `.env` with MongoDB Atlas connection string

**Collections:**
1. **slots** - Parking spaces (100 total, zones A-J)
2. **users** - User accounts (with JWT auth)
3. **payments** - Payment records

**Seed Data:**
- 10 zones (A-J)
- 10 slots per zone = 100 total
- All start as `available`

---

## 🎯 Features Tour

### 1. **3D Dashboard** (Real-time Visualization)
- Interactive 3D grid of parking slots
- Green = available, Red = occupied, Blue = reserved
- Click slot to reserve
- Live occupancy percentage
- Smooth animations

### 2. **AI Entry (OCR Detection)**
- Camera captures license plate
- Tesseract.js reads plate automatically
- System assigns nearest available slot
- Smart lock activates
- Entry confirmation sent

### 3. **Payment System**
- Dynamic pricing based on time of day
- Peak hours (8-10AM, 5-8PM): ₹20/hr × 1.5
- Off-peak: ₹20/hr × 1.2
- Generate UPI QR code for payment
- Email receipt

### 4. **Admin Controls**
- View all bookings
- Force unlock any slot
- See occupancy trends
- Generate reports
- System analytics

### 5. **Voice Commands**
- "Show available slots"
- "What's the parking rate?"
- "Reserve slot A-05"
- Works on Chrome/Edge (Web Speech API)

---

## 🔌 Key API Endpoints

```javascript
// Get all slots
GET /api/slots

// Get single slot
GET /api/slots/A-01

// Update slot (when car enters/leaves)
PUT /api/slots/A-01
{
  "status": "occupied",
  "licensePlate": "KA-51-AB-1234",
  "entryTime": "2024-01-15T10:30:00Z"
}

// Seed 100 demo slots
POST /api/slots/seed/all

// User registration
POST /api/auth/register
{ "email": "user@example.com", "password": "..." }

// User login
POST /api/auth/login
{ "email": "user@example.com", "password": "..." }

// Calculate parking bill
POST /api/payments/bill
{
  "slotNumber": "A-01",
  "entryTime": "2024-01-15T08:00:00Z",
  "exitTime": "2024-01-15T10:30:00Z"
}
```

---

## 💡 Tips & Tricks

### Test the System
1. Open Dashboard in Browser 1: `localhost:3000/dashboard`
2. Open Entry in Browser 2: `localhost:3000/entry`
3. Simulate car entry → Slot updates live on Dashboard
4. Try Payment: `localhost:3000/payment`
5. Check Admin: `localhost:3000/admin`

### View Live Logs
```bash
# Backend console shows:
# ✅ MongoDB Connected
# 📡 Client connected: socket-id
# Slot update received: {data}
```

### Reset Everything
```bash
# Stop both services (Ctrl+C)

# Delete node_modules (optional, but clears cache)
rmdir /s backend\node_modules
rmdir /s frontend\node_modules

# Reinstall
cd backend && npm install
cd ../frontend && npm install

# Clear MongoDB (delete 'Slot' collection in compass)
# Reseed: curl -X POST http://localhost:5000/api/slots/seed/all
```

### Environment Variables
Edit `backend/.env`:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/iot-parking-lot
JWT_SECRET=smartpark_secret_key_2024
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

---

## ❌ Troubleshooting

| Problem | Solution |
|---------|----------|
| MongoDB connection fails | Start `mongod` or use MongoDB Atlas |
| Port 5000/3000 in use | `netstat -ano \| findstr :5000` then `taskkill /PID <id> /F` |
| node_modules missing | `npm install` in backend/ and frontend/ |
| CORS errors | Backend already has CORS enabled |
| Frontend won't load | Clear browser cache (Ctrl+Shift+Delete) |
| 3D not rendering | Update graphics drivers, try different browser |

---

## 📚 Documentation

- **SETUP_GUIDE.md** - Detailed setup instructions
- **PROJECT_ARCHITECTURE.md** - System design & data flow
- **README.md** - Project overview

---

## 🎓 Tech Stack Cheat Sheet

| Component | Tech | Version |
|-----------|------|---------|
| Frontend | React | 19 |
| 3D Rendering | Three.js | Latest |
| 3D React Binding | r3f (react-three-fiber) | 9.x |
| Backend | Express | 4.x |
| Database | MongoDB | 6.x+ |
| Real-time | Socket.io | 4.x |
| Auth | JWT | jsonwebtoken |
| Password Hash | bcryptjs | 2.x |
| OCR | Tesseract.js | 7.x |
| UI Components | React Router | 7.x |
| Charts | Recharts | 3.x |
| Styling | CSS3/Framer Motion | 12.x |

---

## 🚀 Next Steps

1. ✅ Run `check_system.bat` to verify setup
2. ✅ Start backend: `run_backend.bat`
3. ✅ Start frontend: `run_frontend.bat`
4. ✅ Seed DB: `seed_database.bat`
5. ✅ Visit: `http://localhost:3000/dashboard`
6. ✅ Try features!

---

**Questions?** Check SETUP_GUIDE.md or PROJECT_ARCHITECTURE.md

**Production Ready** ✨

---
