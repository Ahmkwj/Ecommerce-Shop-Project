@echo off
echo ====================================
echo E-Commerce Application - Docker Start
echo ====================================
echo.
echo Building and starting containers...
echo.

docker-compose up --build

echo.
echo ====================================
echo Application stopped
echo ====================================
pause
