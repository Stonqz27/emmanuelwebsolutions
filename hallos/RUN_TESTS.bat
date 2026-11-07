@echo off
cd /d "%~dp0"
call npm run test:smoke
if errorlevel 1 echo Some tests failed. Review the output above.
pause
