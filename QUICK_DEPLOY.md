# 🚀 CleanMatch - Quick Deployment Guide

## 📦 Option 1: Docker Deployment (Easiest - 5 Minutes)

### Prerequisites
- Docker Desktop installed ([Download here](https://www.docker.com/products/docker-desktop))
- 2GB RAM available
- 5GB disk space

### Steps:

1. **Download the application files** (you already have them in `/app`)

2. **Navigate to the project directory:**
```bash
cd /path/to/cleanmatch
```

3. **Start with Docker Compose:**
```bash
docker-compose up -d --build
```

4. **Access the application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8001/api/
- MongoDB: localhost:27017

### Management Commands:
```bash
# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Restart services
docker-compose restart

# Rebuild after changes
docker-compose up -d --build
```

---

## 📦 Option 2: Manual Deployment

### Prerequisites
- Node.js 18+ ([Download](https://nodejs.org))
- Python 3.11+ ([Download](https://python.org))
- MongoDB 7.0+ ([Download](https://mongodb.com))
- Yarn (`npm install -g yarn`)

### Backend Setup:

```bash
# Navigate to backend
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cat > .env << EOF
MONGO_URL=mongodb://localhost:27017
DB_NAME=cleanmatch_db
CORS_ORIGINS=*
EOF

# Start backend
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

### Frontend Setup (new terminal):

```bash
# Navigate to frontend
cd frontend

# Install dependencies
yarn install

# Create .env file
cat > .env << EOF
REACT_APP_BACKEND_URL=http://localhost:8001
EOF

# Start frontend
yarn start
```

### MongoDB Setup:

```bash
# Ubuntu/Debian
sudo apt-get install -y mongodb-org
sudo systemctl start mongod

# macOS
brew install mongodb-community
brew services start mongodb-community

# Windows - Download installer from mongodb.com
```

---

## ☁️ Option 3: Cloud Deployment

### Railway.app (Recommended - Easiest Cloud)

1. Go to [Railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub"
3. Connect your repo
4. Railway auto-detects the configuration
5. Add MongoDB service
6. Deploy!

### Render.com

1. Create account at [Render.com](https://render.com)
2. Click "New" → "Web Service"
3. Connect GitHub repo
4. Set build command: `cd frontend && yarn install && yarn build`
5. Set start command: `cd frontend && yarn start`
6. Add environment variables
7. Deploy!

### Heroku

```bash
# Install Heroku CLI
curl https://cli-assets.heroku.com/install.sh | sh

# Login
heroku login

# Create app
heroku create cleanmatch-app

# Add MongoDB
heroku addons:create mongolab:sandbox

# Deploy
git push heroku main
```

### AWS EC2

```bash
# 1. Launch Ubuntu 22.04 instance (t3.medium recommended)
# 2. SSH into instance
ssh -i your-key.pem ubuntu@your-ec2-ip

# 3. Install Docker
sudo apt update
sudo apt install -y docker.io docker-compose
sudo usermod -aG docker ubuntu

# 4. Clone and deploy
git clone your-repo
cd cleanmatch
docker-compose up -d --build

# 5. Configure Security Group:
# Allow ports: 80, 443, 3000, 8001
```

---

## 📁 Project Structure

```
cleanmatch/
├── frontend/                 # React application
│   ├── public/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── data/            # Mock data
│   │   └── contexts/        # React contexts
│   ├── package.json
│   └── .env
├── backend/                  # FastAPI application
│   ├── server.py           # Main backend file
│   ├── requirements.txt
│   └── .env
├── docker-compose.yml       # Docker orchestration
├── Dockerfile.frontend      # Frontend Docker image
├── Dockerfile.backend       # Backend Docker image
└── nginx.conf              # Nginx configuration
```

---

## 🔧 Configuration Files

### Backend .env
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=cleanmatch_db
CORS_ORIGINS=*
```

### Frontend .env
```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

### Production .env (Example)
```env
# Backend
MONGO_URL=mongodb+srv://user:pass@cluster.mongodb.net
DB_NAME=cleanmatch_prod
CORS_ORIGINS=https://yourdomain.com

# Frontend
REACT_APP_BACKEND_URL=https://api.yourdomain.com
```

---

## 🧪 Testing Your Deployment

### 1. Check Services
```bash
# Docker deployment
docker-compose ps

# Manual deployment
# Check if processes are running
ps aux | grep uvicorn  # Backend
ps aux | grep node     # Frontend
ps aux | grep mongod   # MongoDB
```

### 2. Test Backend
```bash
curl http://localhost:8001/api/
# Should return: {"message":"Hello World"}
```

### 3. Test Frontend
Open browser: http://localhost:3000
- Should see CleanMatch homepage
- Navigation menu should work
- Can browse cleaners
- Can view pricing

### 4. Test Database
```bash
mongosh mongodb://localhost:27017
> show dbs
> use cleanmatch_db
> show collections
```

---

## 🐛 Common Issues & Solutions

### Port Already in Use
```bash
# Find process using port
lsof -i :3000  # Frontend
lsof -i :8001  # Backend

# Kill process
kill -9 <PID>
```

### MongoDB Connection Failed
```bash
# Check if MongoDB is running
sudo systemctl status mongod

# Restart MongoDB
sudo systemctl restart mongod

# Check connection
mongosh mongodb://localhost:27017
```

### Docker Build Failed
```bash
# Clean Docker cache
docker system prune -a
docker-compose down -v

# Rebuild
docker-compose up -d --build
```

### Frontend Can't Connect to Backend
```bash
# Check REACT_APP_BACKEND_URL in frontend/.env
echo $REACT_APP_BACKEND_URL

# Should match your backend URL
# Development: http://localhost:8001
# Production: https://your-api-domain.com
```

---

## 🔒 Security Checklist

- [ ] Change default MongoDB credentials
- [ ] Set specific CORS_ORIGINS (not *)
- [ ] Use HTTPS in production
- [ ] Don't expose MongoDB port publicly
- [ ] Use environment variables for secrets
- [ ] Enable firewall
- [ ] Keep dependencies updated
- [ ] Use strong passwords

---

## 📊 Performance Optimization

### Frontend
- Build production bundle: `yarn build`
- Enable compression in nginx
- Use CDN for static assets
- Implement lazy loading

### Backend
- Use gunicorn with multiple workers
- Enable connection pooling for MongoDB
- Implement caching (Redis)
- Use async/await properly

### Database
- Create indexes for frequently queried fields
- Use projections to limit returned fields
- Implement pagination
- Regular backups

---

## 🚀 Production Deployment Checklist

- [ ] Update all environment variables
- [ ] Set up SSL certificates (Let's Encrypt)
- [ ] Configure domain name
- [ ] Set up monitoring (PM2, DataDog, etc.)
- [ ] Configure logging
- [ ] Set up automated backups
- [ ] Test all features in production
- [ ] Set up CI/CD pipeline
- [ ] Configure error tracking (Sentry)
- [ ] Performance testing

---

## 📞 Support

For issues or questions:
- **Email:** support@cleanmatch.ro
- **GitHub Issues:** Create an issue in the repository

---

## 📝 Next Steps After Deployment

1. **Complete Romanian Translation** (15% remaining)
   - Landing page
   - Profile pages
   - Dashboard pages

2. **Add Real Backend**
   - Replace mock data with actual API
   - Implement real authentication
   - Add payment processing

3. **Add Features**
   - Email notifications
   - SMS notifications
   - Real-time chat
   - Payment integration (Stripe/PayPal)
   - Admin dashboard

4. **Monitoring & Analytics**
   - Google Analytics
   - Error tracking
   - Performance monitoring
   - User analytics

---

**🎉 Congratulations! Your CleanMatch application is now deployed!**

Visit http://localhost:3000 to see your running application.
