@echo off
REM E-Shop Stop Script for Windows

echo Stopping E-Shop application...
docker-compose down

if errorlevel 1 (
    echo.
    echo ERROR: Failed to stop containers!
    pause
    exit /b 1
)

echo.
echo E-Shop stopped successfully!
pause

