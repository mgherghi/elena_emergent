#!/bin/bash

# View CleanMatch Docker Logs

echo "📋 CleanMatch Service Logs"
echo "Press Ctrl+C to exit"
echo ""

if [ "$1" == "frontend" ]; then
    docker-compose logs -f frontend
elif [ "$1" == "backend" ]; then
    docker-compose logs -f backend
elif [ "$1" == "mongodb" ]; then
    docker-compose logs -f mongodb
else
    echo "Showing all service logs..."
    echo ""
    docker-compose logs -f
fi