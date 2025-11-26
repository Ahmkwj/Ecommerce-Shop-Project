#!/bin/bash

# E-Shop Stop Script
# This script stops all running containers

echo "Stopping E-Shop application..."
docker-compose down

if [ $? -eq 0 ]; then
    echo ""
    echo "E-Shop stopped successfully!"
else
    echo ""
    echo "ERROR: Failed to stop containers!"
    exit 1
fi

