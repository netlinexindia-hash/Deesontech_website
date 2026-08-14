# Docker Guide — Deesontech Website

## Files Created

| File | Purpose |
|------|---------|
| [client/Dockerfile](file:///home/ajay-rajput/Projects/Deesontech_website/client/Dockerfile) | Multi-stage build: Node → Nginx (serves static React build) |
| [server/Dockerfile](file:///home/ajay-rajput/Projects/Deesontech_website/server/Dockerfile) | Multi-stage build: compiles TS → lean Node production image |
| [docker-compose.yml](file:///home/ajay-rajput/Projects/Deesontech_website/docker-compose.yml) | Orchestrates all 3 services (client, server, db) |
| [.dockerignore](file:///home/ajay-rajput/Projects/Deesontech_website/.dockerignore) | Excludes `node_modules`, `.git`, etc. from build context |

---

## Architecture

```mermaid
graph LR
    Browser["Browser :80"] --> Client["client (Nginx)"]
    Client -->|"/api/*"| Server["server (Node :5000)"]
    Server --> DB["db (PostgreSQL :5432)"]
```

- **client** — Nginx container serving the Vite-built React app. API requests (`/api/*`) are proxied to the `server` service.
- **server** — Node.js container running the compiled Express API.
- **db** — PostgreSQL 16 container with a named volume for data persistence.

---

## Quick Start (Docker Compose)

> [!IMPORTANT]
> Make sure Docker and Docker Compose are installed on your machine.

### 1. Set the database password

Create a `.env` file in the project root:

```bash
echo "POSTGRES_PASSWORD=your_secure_password" > .env
```

### 2. Build and run everything

```bash
docker compose up --build -d
```

This builds both images and starts all 3 containers. The site will be available at **http://localhost**.

### 3. Check the status

```bash
docker compose ps
docker compose logs -f        # follow all logs
docker compose logs server    # only server logs
```

### 4. Stop everything

```bash
docker compose down           # stop & remove containers (data preserved)
docker compose down -v        # also delete the database volume
```

---

## Build Individual Images

If you want to build and push images separately (e.g., to a registry):

### Client image

```bash
cd client
docker build -t deesontech-client:latest .
```

### Server image

```bash
cd server
docker build -t deesontech-server:latest .
```

### Run individual containers

```bash
# Run server (pass env vars)
docker run -d --name deesontech-server \
  -p 5000:5000 \
  -e PORT=5000 \
  -e DATABASE_URL="postgres://user:pass@host:5432/deesontech_db" \
  -e NODE_ENV=production \
  deesontech-server:latest

# Run client
docker run -d --name deesontech-client \
  -p 80:80 \
  deesontech-client:latest
```

---

## Push to a Container Registry

```bash
# Tag and push (example: Docker Hub)
docker tag deesontech-client:latest yourdockerhubuser/deesontech-client:latest
docker tag deesontech-server:latest yourdockerhubuser/deesontech-server:latest

docker push yourdockerhubuser/deesontech-client:latest
docker push yourdockerhubuser/deesontech-server:latest
```

> [!TIP]
> For production deployments, tag images with a version number (e.g., `:1.0.0`) instead of `:latest`.

---

## Common Operations

| Task | Command |
|------|---------|
| Rebuild after code changes | `docker compose up --build -d` |
| Restart a single service | `docker compose restart server` |
| View real-time logs | `docker compose logs -f` |
| Shell into server container | `docker compose exec server sh` |
| Shell into database | `docker compose exec db psql -U deesontech_user -d deesontech_db` |
| Prune unused images | `docker image prune -f` |
