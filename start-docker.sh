#!/bin/bash

# CleanMatch Docker Deployment Script

set -e

echo "═══════════════════════════════════════════════════"
echo "  🚀 CleanMatch Docker Deployment"
echo "═══════════════════════════════════════════════════"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed${NC}"
    echo "Please install Docker Desktop from: https://www.docker.com/products/docker-desktop"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose is not installed${NC}"
    echo "Please install Docker Compose"
    exit 1
fi

echo -e "${GREEN}✅ Docker and Docker Compose found${NC}"
echo ""

# Check if Docker daemon is running
if ! docker info &> /dev/null; then
    echo -e "${RED}❌ Docker daemon is not running${NC}"
    echo "Please start Docker Desktop"
    exit 1
fi

echo -e "${GREEN}✅ Docker daemon is running${NC}"
echo ""

# Stop any existing containers
echo "🛑 Stopping existing containers..."
docker-compose down 2>/dev/null || true
echo ""

# Build and start services
echo "🔨 Building and starting services..."
echo "This may take a few minutes on first run..."
echo ""

docker-compose up -d --build

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ Services started successfully!${NC}"
    echo ""
    echo "⏳ Waiting for services to be ready..."
    sleep 15
    
    echo ""
    echo "═══════════════════════════════════════════════════"
    echo "  📊 Service Status"
    echo "═══════════════════════════════════════════════════"
    docker-compose ps
    
    echo ""
    echo "═══════════════════════════════════════════════════"
    echo "  🌐 Access Your Application"
    echo "═══════════════════════════════════════════════════"
    echo ""
    echo -e "${GREEN}Frontend:${NC} http://localhost:3000"
    echo -e "${GREEN}Backend API:${NC} http://localhost:8001/api/"
    echo -e "${GREEN}MongoDB:${NC} mongodb://localhost:27017"
    echo ""
    echo "═══════════════════════════════════════════════════"
    echo "  🛠️  Useful Commands"
    echo "═══════════════════════════════════════════════════"
    echo ""
    echo "View logs:          docker-compose logs -f"
    echo "View frontend logs: docker-compose logs -f frontend"
    echo "View backend logs:  docker-compose logs -f backend"
    echo "Stop services:      docker-compose down"
    echo "Restart services:   docker-compose restart"
    echo "Rebuild:            docker-compose up -d --build"
    echo ""
    echo -e "${GREEN}🎉 CleanMatch is ready! Open http://localhost:3000 in your browser${NC}"
    echo ""
else
    echo ""
    echo -e "${RED}❌ Failed to start services${NC}"
    echo "Check the logs with: docker-compose logs"
    exit 1
fi