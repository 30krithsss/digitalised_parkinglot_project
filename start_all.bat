@echo off
title AI Smart Parking Lot System - Multi-Server
color 0A
echo.
echo =========================================
echo  🅿 AI SMART PARKING LOT SYSTEM
echo =========================================
echo.
echo 📝 NOTE: Open TWO NEW COMMAND PROMPTS
echo.
echo Terminal 1: Run Backend
echo   - Double-click: run_backend.bat
echo   - OR: cd backend && npm run dev
echo.
echo Terminal 2: Run Frontend  
echo   - Double-click: run_frontend.bat
echo   - OR: cd frontend && npm start
echo.
echo Terminal 3 (Optional): Seed Database
echo   - Run: curl -X POST http://localhost:5000/api/slots/seed/all
echo.
echo =========================================
echo  🌐 Access URLs
echo =========================================
echo Backend API:     http://localhost:5000
echo Frontend App:    http://localhost:3000
echo 3D Dashboard:    http://localhost:3000/dashboard
echo Entry (OCR):     http://localhost:3000/entry
echo Admin Panel:     http://localhost:3000/admin
echo Public Kiosk:    http://localhost:3000/display
echo.
echo =========================================
echo.
pause
