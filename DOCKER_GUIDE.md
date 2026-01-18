# CleanMatch - Docker Quick Reference

## 🚀 Quick Start

```bash
# Make scripts executable
chmod +x start-docker.sh stop-docker.sh logs-docker.sh

# Start everything
./start-docker.sh

# Access the app
open http://localhost:3000
```

## 📋 Common Commands

### Start/Stop
```bash
# Start services
./start-docker.sh
# or
docker-compose up -d --build

# Stop services
./stop-docker.sh
# or
docker-compose down

# Stop and remove all data
docker-compose down -v
```

### View Logs
```bash
# All logs
./logs-docker.sh
# or
docker-compose logs -f

# Specific service
./logs-docker.sh frontend
./logs-docker.sh backend
./logs-docker.sh mongodb
```

### Status & Health
```bash
# Check running services
docker-compose ps

# Check service health
docker-compose ps

# Enter a container
docker exec -it cleanmatch-frontend sh
docker exec -it cleanmatch-backend bash
docker exec -it cleanmatch-mongodb mongosh
```

### Rebuild
```bash
# Rebuild after code changes
docker-compose up -d --build

# Rebuild specific service
docker-compose up -d --build frontend
docker-compose up -d --build backend

# Clean rebuild (remove cache)
docker-compose down
docker system prune -a
docker-compose up -d --build
```

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Find what's using the port
lsof -i :3000
lsof -i :8001
lsof -i :27017

# Kill the process
kill -9 <PID>

# Or change ports in docker-compose.yml
```

### Services Not Starting
```bash
# Check logs
docker-compose logs

# Check specific service
docker-compose logs backend

# Restart services
docker-compose restart

# Full reset
docker-compose down -v
docker-compose up -d --build
```

### Database Issues
```bash
# Access MongoDB shell
docker exec -it cleanmatch-mongodb mongosh

# Check database
show dbs
use cleanmatch_db
show collections

# Reset database
docker-compose down -v
docker-compose up -d
```

### Frontend Not Loading
```bash
# Check if backend is accessible
curl http://localhost:8001/api/

# Check frontend logs
docker-compose logs frontend

# Rebuild frontend
docker-compose up -d --build frontend
```

## 🌐 Access URLs

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8001/api/
- **API Docs:** http://localhost:8001/docs
- **MongoDB:** mongodb://localhost:27017

## 📊 Service Details

### Frontend
- **Container:** cleanmatch-frontend
- **Port:** 3000 → 80
- **Tech:** React + Nginx
- **Build:** Multi-stage (node:18 → nginx:alpine)

### Backend
- **Container:** cleanmatch-backend
- **Port:** 8001
- **Tech:** FastAPI + Python 3.11
- **API:** http://localhost:8001/api/

### MongoDB
- **Container:** cleanmatch-mongodb
- **Port:** 27017
- **Version:** 7.0
- **Data:** Persisted in volume

## 🔐 Environment Variables

### Backend
```env
MONGO_URL=mongodb://mongodb:27017
DB_NAME=cleanmatch_db
CORS_ORIGINS=*
```

### Frontend
```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

## 📦 Data Persistence

Data is stored in Docker volumes:
```bash
# List volumes
docker volume ls

# Inspect volume
docker volume inspect cleanmatch_mongodb_data

# Backup database
docker exec cleanmatch-mongodb mongodump --out /tmp/backup
docker cp cleanmatch-mongodb:/tmp/backup ./backup

# Restore database
docker cp ./backup cleanmatch-mongodb:/tmp/backup
docker exec cleanmatch-mongodb mongorestore /tmp/backup
```

## 🚀 Production Deployment

For production, update `docker-compose.yml`:

```yaml
environment:
  # Backend
  - MONGO_URL=mongodb://your-production-db:27017
  - CORS_ORIGINS=https://yourdomain.com
  
  # Frontend
  - REACT_APP_BACKEND_URL=https://api.yourdomain.com
```

And use:
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 💡 Tips

1. **First time setup takes 5-10 minutes** (downloading images, building)
2. **Subsequent starts are much faster** (30 seconds)
3. **Use volumes for data persistence** (already configured)
4. **Check logs if something fails** (`docker-compose logs`)
5. **Health checks ensure services are ready** before starting dependents

## 📞 Need Help?

If issues persist:
1. Check logs: `docker-compose logs -f`
2. Restart services: `docker-compose restart`
3. Clean rebuild: `docker-compose down && docker-compose up -d --build`
4. Reset everything: `docker-compose down -v && docker-compose up -d --build`