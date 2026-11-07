@echo off
setlocal
cd /d "%~dp0"
title HallOS - PRIVATE WIFI PHONE TEST
where node >nul 2>nul
if errorlevel 1 (
  echo Install Node.js 22+ from https://nodejs.org/ first.
  pause
  exit /b 1
)
set VITE_HALLOS_LOCAL_DEMO=true
set VITE_BASE44_APP_ID=
if not exist node_modules (
  echo Installing dependencies (internet required)...
  call npm install
  if errorlevel 1 (echo npm installation failed. & pause & exit /b 1)
)
echo.
echo ===========================================================
echo HallOS - LOCAL WIFI TEST (FICTIONAL DATA ONLY)
echo ===========================================================
echo Laptop link: http://localhost:5173
powershell -NoProfile -Command "Get-NetIPAddress -AddressFamily IPv4 ^| Where-Object { $_.IPAddress -notlike '127.*' -and $_.IPAddress -notlike '169.254.*' } ^| Select-Object -First 3 -ExpandProperty IPAddress ^| ForEach-Object { Write-Host ('Phone link: http://' + $_ + ':5173') }"
echo.
echo Open the phone link in Safari/Chrome. Connect both devices
 echo to the SAME private Wi-Fi. Allow Node only on private networks.
echo NOTE: Each browser saves fictional data separately.
echo The QR will OPEN on your phone, but the desktop demo database
 echo will NOT automatically sync with your phone in this mode.
echo Do not expose this demo to a public Wi-Fi network.
echo.
call npm run dev -- --host 0.0.0.0 --port 5173 --strictPort
if errorlevel 1 echo Vite couldn't start; inspect errors above.
pause
