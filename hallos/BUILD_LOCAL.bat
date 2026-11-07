@echo off
cd /d "%~dp0"
set VITE_HALLOS_LOCAL_DEMO=true
if not exist node_modules call npm install
if errorlevel 1 goto failed
call npm run build
if errorlevel 1 goto failed
echo Local demo production build generated in dist\
pause
exit /b 0
:failed
echo Build failed. Check output above.
pause
exit /b 1
