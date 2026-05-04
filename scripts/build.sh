#!/bin/bash
# Build all services
cd backend && npm run build
cd ../frontend && npm run build
# ML service: no build step needed
