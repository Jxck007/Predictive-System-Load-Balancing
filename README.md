# Predictive System Load Balancing

A full-stack monorepo for real-time predictive system load balancing with live dashboards, prediction, and weighted round robin routing.

## Tech Stack
- Frontend: React + Vite + Recharts + Socket.IO client
- Backend: Node.js + Express + Socket.IO
- Database: PostgreSQL
- ML Module: Python FastAPI (optional/mock)
- Docker & Deployment: Render, GitHub Pages, Docker Compose

## Monorepo Structure
```
/backend      # Node.js API, WebSocket, routing logic
/frontend     # React dashboard, charts, live updates
/ml-service   # (Optional) FastAPI/mock prediction
/database     # SQL schema, migrations, seed
/docker       # Compose, orchestration
/docs         # Docs, screenshots
```

## Quick Start
1. Clone repo
2. Copy `.env.example` to `.env` in each service
3. `npm install` in backend & frontend
4. `docker compose up` (from /docker)
5. Visit dashboard at http://localhost:5173

See each folder's README for details.
"# Predictive-System-Load-Balancing" 
