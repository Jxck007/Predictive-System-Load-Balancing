import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import { initDb } from './db/index.js';
import fs from 'fs';
import path from 'path';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: { origin: '*' }
});

app.use(cors());
app.use(express.json());
app.use('/api', routes);

// Health endpoint
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Serve frontend static files when available (built by CI/Render)
const staticDir = path.resolve(process.cwd(), 'frontend', 'dist');
if (fs.existsSync(staticDir)) {
  app.use(express.static(staticDir));

  // SPA fallback: serve index.html for all non-API routes
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path === '/health' || req.path.startsWith('/socket.io')) return next();
    res.sendFile(path.join(staticDir, 'index.html'));
  });
} else {
  // Root endpoint for deployment checks (when frontend not built)
  app.get('/', (req, res) => {
    res.json({
      status: 'ok',
      service: 'predictive-system-load-balancing-backend',
    });
  });
}

// Debug endpoint to report static build presence (safe to leave in prod)
app.get('/_static_status', (req, res) => {
  const exists = fs.existsSync(staticDir);
  let files = [];
  if (exists) {
    try {
      files = fs.readdirSync(staticDir).slice(0, 20);
    } catch (err) {
      files = [`error reading directory: ${err.message}`];
    }
  }
  res.json({ exists, files });
});

// WebSocket events
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 4000;
server.listen(PORT, async () => {
  await initDb();
  console.log(`Backend listening on port ${PORT}`);
});

export { io };
