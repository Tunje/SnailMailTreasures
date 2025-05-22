@echo off
echo Starting SnailMail Treasures application...
echo.

REM Start MongoDB (if not already running)
echo Checking if MongoDB is running...
tasklist /FI "IMAGENAME eq mongod.exe" 2>NUL | find /I /N "mongod.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo MongoDB is already running.
) else (
    echo Starting MongoDB...
    start "MongoDB" cmd /c "mongod"
    timeout /t 5
)

REM Start backend server
echo Starting backend server...
start "Backend Server" cmd /c "cd backend && npm start"

REM Wait for backend to initialize
echo Waiting for backend to initialize...
timeout /t 10

REM Start frontend
echo Starting frontend...
start "Frontend" cmd /c "cd frontend && npm run dev"

echo.
echo SnailMail Treasures is starting up!
echo Backend: http://localhost:3000
echo Frontend: http://localhost:5173
echo.
echo Press any key to close this window...
pause > nul
