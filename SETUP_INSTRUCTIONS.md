# 🚀 CleanMatch - Complete Setup Instructions

## ⚠️ IMPORTANT: Directory Structure

Your files must be organized like this:

```
cleanmatch/                    ← You must be in THIS directory
├── docker-compose.yml         ← Main Docker file
├── Dockerfile.frontend        ← Frontend Docker image
├── Dockerfile.backend         ← Backend Docker image
├── nginx.conf                 ← Nginx config
├── start-docker.sh            ← Start script
├── stop-docker.sh             ← Stop script
├── logs-docker.sh             ← Logs script
├── .env.example               ← Environment template
├── frontend/                  ← React app folder
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
└── backend/                   ← FastAPI app folder
    ├── server.py
    ├── requirements.txt
    └── .env
```

## ✅ Step-by-Step Setup

### Step 1: Navigate to the Correct Directory

```bash
cd /path/to/cleanmatch  # The folder containing docker-compose.yml
```

**Verify you're in the right place:**
```bash
ls -la
# You should see:
# - docker-compose.yml
# - Dockerfile.frontend
# - Dockerfile.backend
# - frontend/ directory
# - backend/ directory
```

### Step 2: Make Scripts Executable

```bash
chmod +x start-docker.sh stop-docker.sh logs-docker.sh
```

### Step 3: Start Docker

```bash
./start-docker.sh
```

**Or manually:**
```bash
docker-compose up -d --build
```

### Step 4: Wait and Access

Wait 2-3 minutes for the first build, then:
- Frontend: http://localhost:3000
- Backend: http://localhost:8001/api/

---

## 🐛 Troubleshooting: "File Not Found" Error

If you get: `COPY failed: file not found in build context`

**The problem:** You're running docker-compose from the wrong directory!

**The solution:**

1. Check where you are:
   ```bash
   pwd
   ```

2. Make sure you're in the directory that contains `docker-compose.yml`:
   ```bash
   cd /app  # or wherever your files are
   ```

3. Verify the structure:
   ```bash
   ls -la
   # Should show: docker-compose.yml, frontend/, backend/, Dockerfile.*
   ```

4. Then run:
   ```bash
   docker-compose up -d --build
   ```

---

## 📁 Understanding the Dockerfile Paths

The Dockerfiles use **relative paths** from where docker-compose is run:

**Dockerfile.backend:**
```dockerfile
COPY backend/requirements.txt .     # Looks for ./backend/requirements.txt
COPY backend/ .                      # Copies ./backend/ folder
```

**Dockerfile.frontend:**
```dockerfile
COPY frontend/package.json .         # Looks for ./frontend/package.json
COPY frontend/ .                     # Copies ./frontend/ folder
```

**This means:**
- Run `docker-compose` from the directory containing `frontend/` and `backend/` folders
- NOT from inside `frontend/` or `backend/`
- NOT from a parent directory

---

## ✅ Correct Working Directory

```bash
# ✅ CORRECT
/path/to/cleanmatch $ docker-compose up -d --build
# This works because frontend/ and backend/ are here

# ❌ WRONG
/path/to/cleanmatch/backend $ docker-compose up -d --build
# This fails because it can't find backend/requirements.txt

# ❌ WRONG
/path/to $ docker-compose -f cleanmatch/docker-compose.yml up -d --build
# This fails because relative paths don't work
```

---

## 🔍 Quick Verification Commands

Before running docker-compose:

```bash
# 1. Check you're in the right place
pwd
# Should show: /app or /path/to/cleanmatch

# 2. Check docker-compose.yml exists
ls docker-compose.yml
# Should show: docker-compose.yml

# 3. Check both folders exist
ls -ld frontend backend
# Should show both directories

# 4. Check backend files exist
ls backend/requirements.txt backend/server.py
# Should show both files

# 5. Check frontend files exist
ls frontend/package.json
# Should show: frontend/package.json
```

---

## 🚀 Complete Setup from Scratch

If starting fresh:

```bash
# 1. Go to the project root
cd /app  # or wherever you extracted the files

# 2. Verify structure
ls -la
# Should see: docker-compose.yml, frontend/, backend/

# 3. Make scripts executable
chmod +x *.sh

# 4. Clean any previous attempts
docker-compose down -v
docker system prune -a

# 5. Start fresh
./start-docker.sh
# OR
docker-compose up -d --build

# 6. Watch the build process
docker-compose logs -f

# 7. After 2-3 minutes, check status
docker-compose ps
# All should show "Up" or "healthy"

# 8. Test backend
curl http://localhost:8001/api/
# Should return: {"message":"Hello World"}

# 9. Open frontend
open http://localhost:3000
```

---

## 📝 Common Mistakes

### Mistake 1: Wrong Directory
```bash
# ❌ You're in: /app/backend
# ❌ Running: docker-compose up
# ❌ Error: Can't find backend/requirements.txt

# ✅ Solution:
cd ..  # Go back to /app
docker-compose up -d --build
```

### Mistake 2: Missing Files
```bash
# ❌ Error: backend/requirements.txt not found
# ❌ Cause: Files weren't extracted properly

# ✅ Solution:
# Re-extract the package
tar -xzf cleanmatch-deploy-package.tar.gz
cd cleanmatch-package
docker-compose up -d --build
```

### Mistake 3: Using Old Cache
```bash
# ❌ Error: Build fails with weird errors

# ✅ Solution: Clean rebuild
docker-compose down
docker system prune -a
docker-compose up -d --build
```

---

## 🎯 Quick Start (TL;DR)

```bash
cd /app                              # 1. Go to project root
chmod +x start-docker.sh             # 2. Make executable
./start-docker.sh                    # 3. Start everything
# Wait 3 minutes
open http://localhost:3000           # 4. Access app
```

---

## ✅ Success Indicators

Your setup is working when:

1. `pwd` shows you're in the directory with `docker-compose.yml`
2. `ls frontend backend` shows both directories exist
3. `docker-compose up -d --build` completes without errors
4. `docker-compose ps` shows all services as "Up" or "healthy"
5. `curl http://localhost:8001/api/` returns JSON
6. Browser shows CleanMatch homepage at http://localhost:3000

---

## 🆘 Still Having Issues?

1. **Show us your directory structure:**
   ```bash
   pwd
   ls -la
   ```

2. **Show us the exact error:**
   ```bash
   docker-compose up -d --build 2>&1 | tee error.log
   ```

3. **Check logs:**
   ```bash
   docker-compose logs
   ```

---

**Remember: Always run docker-compose from the directory containing docker-compose.yml!**
