# 🚀 CleanMatch - Docker Deployment

Complete Docker setup for the CleanMatch cleaning services marketplace.

## ⚡ Quick Start (3 Steps)

```bash
# 1. Make scripts executable
chmod +x start-docker.sh

# 2. Start everything
./start-docker.sh

# 3. Open your browser
open http://localhost:3000
```

**That's it!** 🎉

---

## 📋 What You Get

- ✅ **Frontend** - React app with Romanian localization (port 3000)
- ✅ **Backend** - FastAPI REST API (port 8001)
- ✅ **Database** - MongoDB 7.0 (port 27017)
- ✅ **Auto-restart** - Services restart on failure
- ✅ **Health checks** - Ensures services are ready
- ✅ **Data persistence** - MongoDB data preserved

---

## 🎯 Available Scripts

### Start Everything
```bash
./start-docker.sh
```
This will:
- Check Docker installation
- Stop any existing containers
- Build images (first time takes ~5 minutes)
- Start all services
- Show status and access URLs

### Stop Everything
```bash
./stop-docker.sh
```

### View Logs
```bash
# All services
./logs-docker.sh

# Specific service
./logs-docker.sh frontend
./logs-docker.sh backend
./logs-docker.sh mongodb
```

---

## 🌐 Access Your Application

Once started, access:

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | http://localhost:3000 | Main application |
| **Backend API** | http://localhost:8001/api/ | REST API |
| **API Docs** | http://localhost:8001/docs | Swagger UI |
| **MongoDB** | mongodb://localhost:27017 | Database |

---

## 📦 What's Inside?

### Services Configuration

```yaml
Frontend (cleanmatch-frontend)
├── Port: 3000 → 80
├── Built with: React + Tailwind + Shadcn
├── Served by: Nginx
└── Features: Romanian UI, Responsive design

Backend (cleanmatch-backend)
├── Port: 8001
├── Built with: FastAPI + Python 3.11
├── API: RESTful endpoints
└── Features: CORS enabled, Health checks

MongoDB (cleanmatch-mongodb)
├── Port: 27017
├── Version: 7.0
├── Database: cleanmatch_db
└── Persistence: Docker volume
```

### Environment Variables

**Backend:**
- `MONGO_URL=mongodb://mongodb:27017`
- `DB_NAME=cleanmatch_db`
- `CORS_ORIGINS=*`

**Frontend:**
- `REACT_APP_BACKEND_URL=http://localhost:8001`

---

## 🔧 Manual Docker Commands

If you prefer manual control:

```bash
# Start services
docker-compose up -d --build

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Check status
docker-compose ps

# Restart specific service
docker-compose restart frontend

# Rebuild specific service
docker-compose up -d --build backend

# Remove everything including data
docker-compose down -v
```

---

## 🐛 Troubleshooting

### Port Already in Use

If ports 3000, 8001, or 27017 are in use:

```bash
# Find what's using the port
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or change ports in docker-compose.yml
```

### Services Won't Start

```bash
# Check logs
docker-compose logs

# Try clean restart
docker-compose down
docker system prune -a
docker-compose up -d --build
```

### Frontend Not Loading

```bash
# Check if backend is responding
curl http://localhost:8001/api/

# Should return: {"message":"Hello World"}

# If not, check backend logs
docker-compose logs backend
```

### Database Issues

```bash
# Access MongoDB shell
docker exec -it cleanmatch-mongodb mongosh

# Check database
show dbs
use cleanmatch_db
show collections

# Exit with Ctrl+D
```

### Build Fails

```bash
# Clean everything
docker-compose down -v
docker system prune -a --volumes

# Rebuild from scratch
docker-compose up -d --build
```

---

## 📊 Monitoring

### Check Service Health

```bash
# All services status
docker-compose ps

# Individual health check
docker inspect cleanmatch-frontend --format='{{.State.Health.Status}}'
docker inspect cleanmatch-backend --format='{{.State.Health.Status}}'
docker inspect cleanmatch-mongodb --format='{{.State.Health.Status}}'
```

### View Resource Usage

```bash
# CPU and Memory usage
docker stats

# Disk usage
docker system df
```

### Access Container Shell

```bash
# Frontend (Alpine Linux)
docker exec -it cleanmatch-frontend sh

# Backend (Debian)
docker exec -it cleanmatch-backend bash

# MongoDB
docker exec -it cleanmatch-mongodb mongosh
```

---

## 💾 Data Management

### Backup Database

```bash
# Create backup
docker exec cleanmatch-mongodb mongodump --out /tmp/backup
docker cp cleanmatch-mongodb:/tmp/backup ./backup-$(date +%Y%m%d)

# Or use volume backup
docker run --rm -v cleanmatch_mongodb_data:/data -v $(pwd):/backup alpine tar czf /backup/mongodb-backup.tar.gz /data
```

### Restore Database

```bash
# Restore from backup
docker cp ./backup cleanmatch-mongodb:/tmp/backup
docker exec cleanmatch-mongodb mongorestore /tmp/backup
```

### View Volume Data

```bash
# List volumes
docker volume ls

# Inspect volume
docker volume inspect cleanmatch_mongodb_data

# Remove volume (⚠️ deletes all data)
docker volume rm cleanmatch_mongodb_data
```

---

## 🚀 Production Deployment

For production, create `docker-compose.prod.yml`:

```yaml
version: '3.8'

services:
  backend:
    environment:
      - MONGO_URL=mongodb+srv://user:pass@cluster.mongodb.net
      - DB_NAME=cleanmatch_prod
      - CORS_ORIGINS=https://yourdomain.com
    restart: unless-stopped

  frontend:
    environment:
      - REACT_APP_BACKEND_URL=https://api.yourdomain.com
    restart: unless-stopped
```

Deploy with:
```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

---

## 🔐 Security Checklist

Before deploying to production:

- [ ] Change default MongoDB credentials
- [ ] Set specific CORS origins (not `*`)
- [ ] Use HTTPS/SSL certificates
- [ ] Don't expose MongoDB port publicly
- [ ] Use secrets for sensitive data
- [ ] Enable firewall rules
- [ ] Set up monitoring/alerting
- [ ] Regular security updates

---

## 📈 Scaling

### Horizontal Scaling

```yaml
# Scale frontend to 3 instances
docker-compose up -d --scale frontend=3

# Add load balancer (nginx)
services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx-lb.conf:/etc/nginx/nginx.conf
```

### Add Redis Cache

```yaml
services:
  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
```

---

## 🎓 Learning Resources

- **Docker Docs:** https://docs.docker.com
- **Docker Compose:** https://docs.docker.com/compose
- **FastAPI:** https://fastapi.tiangolo.com
- **React:** https://react.dev
- **MongoDB:** https://www.mongodb.com/docs

---

## 📞 Support

Having issues?

1. Check the logs: `./logs-docker.sh`
2. Read the troubleshooting section above
3. See `DOCKER_GUIDE.md` for detailed commands
4. Check service health: `docker-compose ps`

---

## ✅ Success Indicators

Your deployment is successful when:

- ✅ `./start-docker.sh` completes without errors
- ✅ `docker-compose ps` shows all services as "healthy"
- ✅ http://localhost:3000 loads the CleanMatch homepage
- ✅ http://localhost:8001/api/ returns `{"message":"Hello World"}`
- ✅ You can browse cleaners and navigate the site

---

## 🎯 Next Steps

1. **Test the application** - Browse, search, view profiles
2. **Check responsive design** - Test on mobile
3. **Review logs** - Make sure no errors
4. **Customize** - Update colors, content, features
5. **Deploy to cloud** - Use Railway, AWS, or DigitalOcean

---

**🎉 Enjoy your CleanMatch application!**

Made with ❤️ for the Romanian cleaning services market.
