@echo off
cd /d "%~dp0backend"
echo Starting Backend Server on port 5000...
echo.
npm run dev
pause
