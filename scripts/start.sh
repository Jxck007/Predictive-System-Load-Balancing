#!/bin/bash
# Start all services in production mode
docker compose -f docker/docker-compose.yml up -d
