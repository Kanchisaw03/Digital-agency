
@echo off
echo Starting Vigyapana Development Servers...

echo.
echo Starting Backend Server...
cd backend
set MONGODB_URI=mongodb+srv://Kanchisaw:Kanchisaw03@cluster0.f1fmc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
set JWT_SECRET=8cc5ba691af7dbfe725be841d5d600af7deaaf2ae38260d663b95a8247c1737b48e6d396ec17a59847bd3a530915009d86a607ad522f2dd681e796574439d685

set NODE_ENV=development
set PORT=5000
start "Backend Server" cmd /c "npm run dev"

echo.
echo Waiting 5 seconds for backend to start...
timeout /t 5 /nobreak > nul

echo.
echo Starting Frontend Server...
cd ..
start "Frontend Server" cmd /c "npm run dev:frontend"

echo.
echo Both servers starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo Admin: http://localhost:5173/admin/login
echo.
pause 