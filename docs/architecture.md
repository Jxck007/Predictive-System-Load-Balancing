# Predictive System Load Balancing - Architecture

## Overview
This system balances load across multiple servers using real-time metrics and predictive analytics. The backend exposes REST and WebSocket APIs, the frontend provides a live dashboard, and an optional ML service predicts future loads.

## Components
- **Frontend (React + Vite):** Dashboard UI, live charts, server/prediction panels
- **Backend (Node.js + Express + Socket.IO):** REST API, WebSocket, round robin logic, DB
- **Database (PostgreSQL):** Stores servers, metrics, predictions, routing weights
- **ML Service (FastAPI):** Predicts server load (can be mocked)
- **Docker Compose:** Local dev orchestration

## Data Flow
1. Backend fetches metrics from DB and emits updates via WebSocket
2. Frontend subscribes to live updates and displays charts
3. Prediction endpoint returns latest or predicted loads
4. Weighted round robin logic selects next server for routing

## Deployment
- **Backend:** Render (Dockerfile)
- **Frontend:** GitHub Pages (static build)
- **Database:** Render PostgreSQL
- **ML Service:** Optional, can be containerized

## Folder Structure
See root README for details.
