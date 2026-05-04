#!/bin/bash
# Start all services in dev mode
cd backend && npm install & cd ../frontend && npm install & cd ../ml-service && pip install -r requirements.txt & cd ..
docker compose -f docker/docker-compose.yml up --build
