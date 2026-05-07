@echo off
title Smart Parking - Seed Database
color 0B
echo.
echo ====================================================
echo  🌱 SEEDING MONGODB DATABASE
echo ====================================================
echo.
echo Make sure:
echo  1. MongoDB is running (mongod)
echo  2. Backend is running on http://localhost:5000
echo.
echo Seeding 100 parking slots across 10 zones (A-J)...
echo.

:: Check if curl is available
where curl >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ curl not found. Trying alternative method...
    powershell -Command "Invoke-WebRequest -Uri 'http://localhost:5000/api/slots/seed/all' -Method POST"
) else (
    echo ✅ Using curl...
    curl -X POST http://localhost:5000/api/slots/seed/all
)

echo.
echo ====================================================
echo  If you see a success message above, database is seeded!
echo  Otherwise, check that MongoDB and Backend are running.
echo ====================================================
echo.
pause
