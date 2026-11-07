@echo off
setlocal
cd /d "%~dp0"
title HallOS - LOCAL TEST (fictional data)
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed. Get Node.js 22 LTS or later from https://nodejs.org/
  pause
  exit /b 1
)
where npm >nul 2>nul
if errorlevel 1 (
  echo npm is missing. Install Node.js with npm and try again.
  pause
  exit /b 1
)
set VITE_HALLOS_LOCAL_DEMO=true
set VITE_BASE44_APP_ID=
if not exist node_modules (
  echo Installing project packages. Requires internet; this is only needed the first time...
  call npm install
  if errorlevel 1 (
    echo Package install failed. Check internet connection and npm error above.
    pause
    exit /b 1
  )
)
echo.
echo Starting HallOS local demo at http://localhost:5173
start "" "http://localhost:5173"
call npm run dev -- --host 127.0.0.1 --port 5173
if errorlevel 1 (echo The server could not start. Check the errors above.)
pause
