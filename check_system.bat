@echo off
title Smart Parking System - Pre-Flight Check
color 0E
cls
echo.
echo ╔═══════════════════════════════════════════════════════════════════╗
echo ║       🅿 AI SMART PARKING LOT SYSTEM - PRE-FLIGHT CHECK           ║
echo ╚═══════════════════════════════════════════════════════════════════╝
echo.

setlocal enabledelayedexpansion

REM Check Node.js
echo [1/5] Checking Node.js...
node --version >nul 2>&1
if !ERRORLEVEL! EQU 0 (
    for /f "tokens=*" %%i in ('node --version') do set NODE_VER=%%i
    echo     ✅ Node.js !NODE_VER! found
) else (
    echo     ❌ Node.js NOT found. Install from https://nodejs.org
    goto :ERROR
)
echo.

REM Check npm
echo [2/5] Checking npm...
npm --version >nul 2>&1
if !ERRORLEVEL! EQU 0 (
    for /f "tokens=*" %%i in ('npm --version') do set NPM_VER=%%i
    echo     ✅ npm !NPM_VER! found
) else (
    echo     ❌ npm NOT found
    goto :ERROR
)
echo.

REM Check MongoDB (local)
echo [3/5] Checking MongoDB...
where mongod >nul 2>&1
if !ERRORLEVEL! EQU 0 (
    echo     ✅ MongoDB found (local installation)
    echo     💡 Start MongoDB with: mongod
) else (
    echo     ⚠️  MongoDB local not found
    echo     💡 Options:
    echo        - Install MongoDB from: https://www.mongodb.com/try/download/community
    echo        - Use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas
    echo        - Update backend\.env with your connection string
)
echo.

REM Check Backend dependencies
echo [4/5] Checking Backend dependencies...
if exist "backend\node_modules" (
    echo     ✅ Backend node_modules found
) else (
    echo     ⚠️  Backend dependencies not installed
    echo     💡 Run: cd backend ^&^& npm install
)
echo.

REM Check Frontend dependencies
echo [5/5] Checking Frontend dependencies...
if exist "frontend\node_modules" (
    echo     ✅ Frontend node_modules found
) else (
    echo     ⚠️  Frontend dependencies not installed
    echo     💡 Run: cd frontend ^&^& npm install
)
echo.

echo ╔═══════════════════════════════════════════════════════════════════╗
echo ║                    🚀 NEXT STEPS                                  ║
echo ╚═══════════════════════════════════════════════════════════════════╝
echo.
echo Terminal 1: Start Backend
echo   ➜ run_backend.bat
echo     OR
echo   ➜ cd backend && npm run dev
echo.
echo Terminal 2: Start Frontend
echo   ➜ run_frontend.bat
echo     OR
echo   ➜ cd frontend && npm start
echo.
echo Terminal 3: Seed Database (after both are running)
echo   ➜ seed_database.bat
echo     OR
echo   ➜ curl -X POST http://localhost:5000/api/slots/seed/all
echo.
echo ╔═══════════════════════════════════════════════════════════════════╗
echo ║                    🌐 ACCESS URLS                                 ║
echo ╚═══════════════════════════════════════════════════════════════════╝
echo.
echo Backend API:        http://localhost:5000
echo Frontend App:       http://localhost:3000
echo 3D Dashboard:       http://localhost:3000/dashboard
echo Entry (AI OCR):     http://localhost:3000/entry
echo Payment System:     http://localhost:3000/payment
echo Admin Panel:        http://localhost:3000/admin
echo Public Kiosk:       http://localhost:3000/display
echo.
echo 📖 Documentation: SETUP_GUIDE.md
echo 🏗️  Architecture:  PROJECT_ARCHITECTURE.md
echo.
echo Press any key to close...
pause >nul
exit /b 0

:ERROR
echo.
echo ❌ Pre-flight check FAILED!
echo.
echo Please resolve the above issues and try again.
echo.
pause
exit /b 1
