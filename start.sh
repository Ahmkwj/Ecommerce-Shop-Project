#!/bin/bash

# E-Shop Startup Script
# This script starts both frontend and backend using Docker Compose

echo "======================================"
echo "   E-Shop Application Startup"
echo "======================================"
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "ERROR: Docker is not running!"
    echo "Please start Docker Desktop and try again."
    exit 1
fi

echo "✓ Docker is running"
echo ""

# Check if docker-compose.yml exists
if [ ! -f "docker-compose.yml" ]; then
    echo "ERROR: docker-compose.yml not found!"
    echo "Please run this script from the project root directory."
    exit 1
fi

echo "Starting E-Shop application..."
echo ""

# Stop any existing containers
echo "Stopping any existing containers..."
docker-compose down 2>/dev/null

echo ""
echo "Building and starting containers..."
echo "This may take a few minutes on first run..."
echo ""

# Build and start containers
docker-compose up --build -d

# Check if containers started successfully
if [ $? -eq 0 ]; then
    echo ""
    echo "======================================"
    echo "   E-Shop Started Successfully!"
    echo "======================================"
    echo ""
    echo "Backend:  http://localhost:8080"
    echo "Frontend: http://localhost:3000"
    echo ""
    echo "To view logs: docker-compose logs -f"
    echo "To stop:      docker-compose down"
    echo ""
else
    echo ""
    echo "ERROR: Failed to start containers!"
    echo "Run 'docker-compose logs' to see error details."
    exit 1
fi

