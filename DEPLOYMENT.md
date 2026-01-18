# CleanMatch - Deployment Guide

CleanMatch este o platformă marketplace pentru servicii de curățenie, construită cu React, FastAPI și MongoDB.

## 📋 Cuprins

- [Cerințe](#cerințe)
- [Deployment cu Docker](#deployment-cu-docker)
- [Deployment Manual](#deployment-manual)
- [Deployment pe Cloud](#deployment-pe-cloud)
- [Troubleshooting](#troubleshooting)

---

## 🔧 Cerințe

### Pentru Docker:
- Docker Engine 20.10+
- Docker Compose 2.0+
- 2GB RAM minim
- 5GB spațiu pe disc

### Pentru Deployment Manual:
- Node.js 18+
- Python 3.11+
- MongoDB 7.0+
- Yarn package manager

---

## 🐳 Deployment cu Docker (RECOMANDAT)

### Pasul 1: Clonează Repository

```bash
cd cleanmatch
```

### Pasul 2: Configurează Environment Variables

```bash
cp .env.example .env
# Editează .env dacă este necesar
```

### Pasul 3: Build și Start

```bash
# Build și pornește toate serviciile
docker-compose up -d --build

# Verifică status
docker-compose ps

# Vezi logs
docker-compose logs -f
```

### Pasul 4: Accesează Aplicația

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8001
- **MongoDB:** localhost:27017

### Comenzi Utile Docker

```bash
# Stop servicii
docker-compose down

# Stop și șterge volume (șterge date)
docker-compose down -v

# Restart servicii
docker-compose restart

# Vezi logs pentru un serviciu specific
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f mongodb

# Rebuild după modificări
docker-compose up -d --build
```

---

## 🔨 Deployment Manual

### Pasul 1: Instalează MongoDB

```bash
# Ubuntu/Debian
sudo apt-get install -y mongodb-org

# macOS
brew install mongodb-community

# Start MongoDB
sudo systemctl start mongod  # Linux
brew services start mongodb-community  # macOS
```

### Pasul 2: Setup Backend

```bash
cd backend

# Creează virtual environment
python3 -m venv venv
source venv/bin/activate  # Linux/macOS
# sau
venv\Scripts\activate  # Windows

# Instalează dependencies
pip install -r requirements.txt

# Creează .env
cat > .env << EOF
MONGO_URL=mongodb://localhost:27017
DB_NAME=cleanmatch_db
CORS_ORIGINS=*
EOF

# Start backend
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

### Pasul 3: Setup Frontend

```bash
# Deschide un terminal nou
cd frontend

# Instalează dependencies
yarn install

# Creează .env
cat > .env << EOF
REACT_APP_BACKEND_URL=http://localhost:8001
EOF

# Start frontend
yarn start
```

### Pasul 4: Accesează Aplicația

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:8001

---

## ☁️ Deployment pe Cloud

### AWS Deployment

#### Opțiunea 1: EC2 + Docker

```bash
# 1. Lansează EC2 instance (Ubuntu 22.04, t3.medium)
# 2. SSH în instance
ssh -i your-key.pem ubuntu@your-ec2-ip

# 3. Instalează Docker
sudo apt update
sudo apt install -y docker.io docker-compose
sudo usermod -aG docker ubuntu

# 4. Clone repo și deploy
git clone your-repo-url
cd cleanmatch
docker-compose up -d --build

# 5. Configurează Security Groups:
# - Port 80 (HTTP)
# - Port 443 (HTTPS)
# - Port 3000 (Frontend)
# - Port 8001 (Backend)
```

#### Opțiunea 2: ECS (Elastic Container Service)

1. Push images la ECR
2. Creează ECS Task Definition
3. Creează ECS Service
4. Configurează Load Balancer

### DigitalOcean Deployment

```bash
# 1. Creează Droplet (Ubuntu 22.04, $12/month)
# 2. SSH în Droplet
ssh root@your-droplet-ip

# 3. Instalează Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 4. Deploy
git clone your-repo-url
cd cleanmatch
docker-compose up -d --build
```

### Heroku Deployment

```bash
# Instalează Heroku CLI
curl https://cli-assets.heroku.com/install.sh | sh

# Login
heroku login

# Creează app
heroku create cleanmatch-app

# Add MongoDB
heroku addons:create mongolab:sandbox

# Deploy
git push heroku main
```

### Railway.app Deployment (SIMPLU)

1. Conectează GitHub repo la Railway
2. Railway detectează automat configurația
3. Add MongoDB service
4. Deploy automat

---

## 🔧 Troubleshooting

### Frontend nu se conectează la Backend

```bash
# Verifică REACT_APP_BACKEND_URL în .env
echo $REACT_APP_BACKEND_URL

# Verifică dacă backend rulează
curl http://localhost:8001/api/

# Verifică CORS settings în backend/.env
```

### MongoDB Connection Error

```bash
# Verifică dacă MongoDB rulează
sudo systemctl status mongod  # Linux
brew services list  # macOS

# Test connection
mongosh mongodb://localhost:27017

# Verifică MONGO_URL în backend/.env
```

### Port Already in Use

```bash
# Găsește procesul care folosește portul
lsof -i :3000  # Frontend
lsof -i :8001  # Backend

# Kill procesul
kill -9 <PID>

# Sau schimbă portul în docker-compose.yml
```

### Docker Build Errors

```bash
# Șterge cache și rebuild
docker-compose down
docker system prune -a
docker-compose up -d --build
```

### Production Environment Variables

```bash
# Pentru production, actualizează:
# backend/.env
MONGO_URL=mongodb://your-production-url
DB_NAME=cleanmatch_prod
CORS_ORIGINS=https://yourdomain.com

# frontend/.env
REACT_APP_BACKEND_URL=https://api.yourdomain.com
```

---

## 📊 Monitoring și Logs

### Docker Logs

```bash
# Toate serviciile
docker-compose logs -f

# Serviciu specific
docker-compose logs -f backend

# Ultimele 100 linii
docker-compose logs --tail=100 frontend
```

### Health Checks

```bash
# Backend health
curl http://localhost:8001/api/

# Frontend health
curl http://localhost:3000

# MongoDB health
mongosh --eval "db.adminCommand('ping')"
```

---

## 🔒 Security Best Practices

1. **Schimbă credențialele default**
2. **Folosește HTTPS în production**
3. **Setează CORS specific pentru production**
4. **Nu expune porturile MongoDB public**
5. **Folosește secrets management** (AWS Secrets Manager, etc.)
6. **Enable firewall** și allow doar porturile necesare
7. **Regular updates** pentru dependencies

---

## 📞 Support

Pentru probleme sau întrebări:
- Email: support@cleanmatch.ro
- GitHub Issues: [your-repo]/issues

---

## 📝 Licență

CleanMatch - Cleaning Services Marketplace
Copyright © 2024
