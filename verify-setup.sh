#!/bin/bash

# CleanMatch Setup Verification Script

echo "🔍 CleanMatch Setup Verification"
echo "=================================="
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

checks_passed=0
checks_failed=0

# Function to check
check() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ $2${NC}"
        ((checks_passed++))
    else
        echo -e "${RED}❌ $2${NC}"
        ((checks_failed++))
    fi
}

# Check 1: docker-compose.yml exists
echo "Checking required files..."
test -f docker-compose.yml
check $? "docker-compose.yml found"

# Check 2: Dockerfiles exist
test -f Dockerfile.frontend
check $? "Dockerfile.frontend found"

test -f Dockerfile.backend
check $? "Dockerfile.backend found"

# Check 3: Directories exist
test -d frontend
check $? "frontend/ directory found"

test -d backend
check $? "backend/ directory found"

# Check 4: Backend files
test -f backend/requirements.txt
check $? "backend/requirements.txt found"

test -f backend/server.py
check $? "backend/server.py found"

# Check 5: Frontend files
test -f frontend/package.json
check $? "frontend/package.json found"

test -d frontend/src
check $? "frontend/src/ directory found"

# Check 6: Scripts exist
test -f start-docker.sh
check $? "start-docker.sh found"

# Check 7: Docker is installed
command -v docker &> /dev/null
check $? "Docker is installed"

# Check 8: Docker Compose is installed
command -v docker-compose &> /dev/null
check $? "Docker Compose is installed"

echo ""
echo "=================================="
echo "Results:"
echo -e "${GREEN}Passed: $checks_passed${NC}"
echo -e "${RED}Failed: $checks_failed${NC}"
echo ""

if [ $checks_failed -eq 0 ]; then
    echo -e "${GREEN}🎉 All checks passed! You're ready to run:${NC}"
    echo ""
    echo "  ./start-docker.sh"
    echo ""
    echo "Or:"
    echo ""
    echo "  docker-compose up -d --build"
    echo ""
    exit 0
else
    echo -e "${RED}⚠️  Some checks failed. Please fix the issues above.${NC}"
    echo ""
    echo "Common issues:"
    echo "1. You're in the wrong directory (use: cd /app)"
    echo "2. Files weren't extracted properly"
    echo "3. Docker is not installed"
    echo ""
    exit 1
fi
