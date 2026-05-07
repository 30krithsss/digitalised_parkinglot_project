# 🏗️ AI Smart Parking System - Architecture

## 📊 System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    WEB BROWSERS (Frontend)                       │
│  ┌──────────────┬──────────────┬──────────────┬──────────────┐  │
│  │  3D Dashboard│  Entry OCR   │   Payment    │  Admin Panel │  │
│  │ (Three.js)   │ (Tesseract)  │   (QR Code)  │ (Analytics)  │  │
│  └──────────────┴──────────────┴──────────────┴──────────────┘  │
│           │                                         │             │
│           └─────────────────────────────────────────┘             │
└─────────────────────────────────────────────────────────────────┘
                          │ HTTP/WebSocket
                          │
┌─────────────────────────────────────────────────────────────────┐
│                  BACKEND (Node.js/Express)                      │
│                    :5000 (Port 5000)                            │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Express Routes & Controllers              │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │  /api/slots          - Slot management                 │   │
│  │  /api/auth           - User authentication (JWT)       │   │
│  │  /api/payments       - Billing & payment tracking      │   │
│  └─────────────────────────────────────────────────────────┘   │
│                          │                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │           Socket.io (Real-time Updates)                │   │
│  │  • Slot status changes                                 │   │
│  │  • Occupancy updates                                   │   │
│  │  • Payment confirmations                               │   │
│  └─────────────────────────────────────────────────────────┘   │
│                          │                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │            Business Logic Services                     │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │  • Dynamic Pricing (Peak hours: 1.5x)                  │   │
│  │  • Slot Assignment Logic                               │   │
│  │  • Email Notifications (Nodemailer)                    │   │
│  │  • JWT Token Management                                │   │
│  └─────────────────────────────────────────────────────────┘   │
│                          │                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │         Mongoose ODM (Data Layer)                      │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │  • Slot Model                                           │   │
│  │  • User Model                                           │   │
│  │  • Payment Model                                        │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                          │
                          │ MongoDB Query
                          │
┌─────────────────────────────────────────────────────────────────┐
│                   MONGODB DATABASE :27017                        │
│                  (Local or MongoDB Atlas)                        │
│                                                                  │
│  ┌──────────────┬──────────────┬──────────────┬──────────────┐  │
│  │   Slots      │    Users     │   Payments   │  Sessions    │  │
│  │ Collection   │ Collection   │ Collection   │ Collection   │  │
│  ├──────────────┼──────────────┼──────────────┼──────────────┤  │
│  │ slotNumber   │ email        │ userId       │ sessionId    │  │
│  │ zone         │ password     │ amount       │ token        │  │
│  │ status       │ role         │ paymentTime  │ expiry       │  │
│  │ licensePlate │ subscription │ status       │              │  │
│  │ entryTime    │ createdAt    │ slotNumber   │              │  │
│  └──────────────┴──────────────┴──────────────┴──────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow Example: Car Entry

```
1. CAR ARRIVES
   └─> IoT Camera/Sensor detects vehicle

2. LICENSE PLATE RECOGNITION
   └─> Tesseract.js (OCR) reads plate
       └─> Sends to backend

3. BACKEND PROCESSES
   ├─> Verify license plate
   ├─> Find available slot
   ├─> Create slot reservation
   └─> Trigger smart lock (GPIO relay)

4. DATABASE UPDATES
   ├─> Update slot status: "occupied"
   ├─> Store licensePlate & entryTime
   └─> Create booking record

5. REAL-TIME UPDATES
   ├─> Socket.io broadcasts slot change
   ├─> 3D Dashboard updates (slot turns red)
   └─> Admin panel shows new occupancy

6. FRONTEND DISPLAYS
   ├─> 3D visualization updates
   ├─> Send SMS/Email confirmation
   └─> Show pricing estimate
```

---

## 🎯 Component Breakdown

### Frontend (React 19)
```
App.js
├── Pages/
│   ├── Dashboard3D.js         (Three.js, r3f)
│   ├── EntryOCR.js            (Tesseract.js)
│   ├── PaymentGateway.js      (Dynamic pricing)
│   ├── AdminPanel.js          (Analytics, controls)
│   └── PublicKiosk.js         (Display screen)
├── Components/
│   ├── Slot3D.js              (3D slot model)
│   ├── OccupancyChart.js      (Recharts)
│   ├── QRCodePayment.js       (qrcode.react)
│   └── VoiceCommand.js        (Web Speech API)
└── Services/
    ├── api.js                 (Axios HTTP client)
    ├── socketio.js            (WebSocket connection)
    └── auth.js                (JWT token management)
```

### Backend (Node.js/Express)
```
server.js
├── Routes/
│   ├── slots.js               (GET/PUT /api/slots)
│   ├── auth.js                (POST /api/auth/register, login)
│   └── payments.js            (POST /api/payments/bill)
├── Models/
│   ├── Slot.js                (Mongoose schema)
│   ├── User.js                (User schema + auth)
│   └── Payment.js             (Payment schema)
├── Services/
│   ├── pricingService.js      (Dynamic rates)
│   ├── notificationService.js (Email via Nodemailer)
│   └── lockService.js         (GPIO/IoT control simulation)
└── Middleware/
    └── auth.js                (JWT verification)
```

### MongoDB Collections
```
Slots
├── _id: ObjectId
├── slotNumber: String ("A-01")
├── zone: String ("A")
├── status: String ("available"/"occupied"/"reserved")
├── licensePlate: String (nullable)
├── entryTime: Date (nullable)
├── exitTime: Date (nullable)
└── timestamps

Users
├── _id: ObjectId
├── email: String
├── password: String (bcrypt hashed)
├── role: String ("user"/"admin")
└── subscription: String ("free"/"premium")

Payments
├── _id: ObjectId
├── userId: ObjectId
├── slotNumber: String
├── entryTime: Date
├── exitTime: Date
├── duration: Number (hours)
├── baseRate: Number (₹/hour)
├── peakMultiplier: Number (1.5x or 1.2x)
├── totalAmount: Number (₹)
└── status: String ("pending"/"paid")
```

---

## 🔌 API Endpoints Reference

### Slots Management
```
GET    /api/slots                    Get all slots
GET    /api/slots/:slotNumber        Get specific slot
PUT    /api/slots/:slotNumber        Update slot (OCR, lock)
POST   /api/slots/seed/all           Seed 100 demo slots
```

### Authentication
```
POST   /api/auth/register            Register new user
POST   /api/auth/login               User login (returns JWT)
GET    /api/auth/profile             Get user profile
POST   /api/auth/logout              Logout & invalidate token
```

### Payments
```
POST   /api/payments/bill            Calculate bill
GET    /api/payments/:id             Get payment record
POST   /api/payments/qr              Generate QR code
```

---

## 🌐 Socket.io Events

### Server → Client (Broadcast)
```javascript
socket.emit('slot-update', {
  slotNumber: 'A-01',
  status: 'occupied',
  licensePlate: 'KA-51-AB-1234',
  timestamp: '2024-01-15T10:30:00Z'
});

socket.emit('occupancy-change', {
  totalOccupied: 45,
  totalAvailable: 55,
  percentage: 45
});

socket.emit('payment-complete', {
  userId: '...',
  amount: 75,
  slotNumber: 'A-01'
});
```

### Client → Server (Events)
```javascript
socket.emit('slot-update', slotData);
socket.emit('request-status', 'all');
socket.emit('payment-request', paymentData);
```

---

## ⚡ Performance Optimizations

- **Code Splitting**: React lazy loading for routes
- **3D Rendering**: Three.js + r3f for 60fps
- **WebSocket**: Real-time without polling
- **Database Indexing**: Unique index on `slotNumber`
- **JWT Auth**: Stateless authentication
- **Caching**: Client-side slot data caching

---

## 🔐 Security Features

- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: bcryptjs (10 salt rounds)
- **CORS**: Cross-origin requests controlled
- **MongoDB Injection Prevention**: Mongoose sanitization
- **Environment Variables**: Secrets in .env (not in git)
- **Role-Based Access**: Admin vs User permissions

---

## 📈 Scalability Considerations

1. **MongoDB Sharding**: Partition slots by zone
2. **Redis Caching**: Cache frequently accessed slots
3. **Load Balancing**: Multiple backend instances
4. **CDN**: Serve frontend assets globally
5. **Database Replication**: MongoDB Replica Sets
6. **Message Queue**: Bull for async tasks (email, notifications)

---

## 🎯 Future Enhancements

- [ ] True ML occupancy prediction (TensorFlow.js)
- [ ] Mobile app (React Native)
- [ ] Real IoT integration (Raspberry Pi + GPIO)
- [ ] AR slot navigation
- [ ] Integration with payment gateways (Razorpay, Stripe)
- [ ] Multi-parking facility support
- [ ] Advanced analytics & reports

---
