@echo off
setlocal
cd /d "%~dp0"
title HallOS - Automated Showcase Pipeline Test
where node >nul 2>nul
if errorlevel 1 (
  echo Install Node.js 22+ from https://nodejs.org/ first.
  pause
  exit /b 1
)
echo Running the HallOS end-to-end local demo tests...
echo This requires only Node.js. No npm install is needed.
echo.
node --test
if errorlevel 1 (
  echo.
  echo AT LEAST ONE TEST FAILED. Do not present this build until reviewed.
) else (
  echo.
  echo All local source and simulated backend tests passed.
  echo This does NOT verify the actual Base44 server or a real phone push notification.
)
echo.
pause
