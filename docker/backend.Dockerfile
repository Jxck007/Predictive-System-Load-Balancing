# Backend service
FROM node:20-alpine
WORKDIR /app
COPY ./backend/package*.json ./
RUN npm install
COPY ./backend .
EXPOSE 4000 4001
CMD ["npm", "run", "start"]

# ML service (optional)
FROM python:3.11-slim as ml-service
WORKDIR /app
COPY ./ml-service/requirements.txt ./
RUN pip install -r requirements.txt
COPY ./ml-service .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
