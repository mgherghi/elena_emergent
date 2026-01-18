#!/bin/bash

# Stop CleanMatch Docker Services

echo "🛑 Stopping CleanMatch services..."

docker-compose down

if [ $? -eq 0 ]; then
    echo "✅ Services stopped successfully"
    echo ""
    echo "To remove all data (including database):"
    echo "  docker-compose down -v"
    echo ""
    echo "To start again:"
    echo "  ./start-docker.sh"
else
    echo "❌ Failed to stop services"
    exit 1
fi