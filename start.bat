@echo off
REM E-Shop Startup Script for Windows
REM This script starts both frontend and backend using Docker Compose

echo ======================================
echo    E-Shop Application Startup
echo ======================================
echo.

REM Check if Docker is running
docker info >nul 2>&1
if errorlevel 1 (
    echo ERROR: Docker is not running!
    echo Please start Docker Desktop and try again.
    pause
    exit /b 1
)

echo [OK] Docker is running
echo.

REM Check if docker-compose.yml exists
if not exist docker-compose.yml (
    echo ERROR: docker-compose.yml not found!
    echo Please run this script from the project root directory.
    pause
    exit /b 1
)

echo Starting E-Shop application...
echo.

REM Stop any existing containers
echo Stopping any existing containers...
docker-compose down >nul 2>&1

echo.
echo Building and starting containers...
echo This may take a few minutes on first run...
echo.

REM Build and start containers
docker-compose up --build -d

if errorlevel 1 (
    echo.
    echo ERROR: Failed to start containers!
    echo Run 'docker-compose logs' to see error details.
    pause
    exit /b 1
)

echo.
echo ======================================
echo    E-Shop Started Successfully!
echo ======================================
echo.
echo Backend:  http://localhost:8080
echo Frontend: http://localhost:3000
echo.
echo To view logs: docker-compose logs -f
echo To stop:      docker-compose down
echo.
pause

