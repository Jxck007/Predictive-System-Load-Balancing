import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import { initDb } from './db/index.js';

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

// Root endpoint for deployment checks
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'predictive-system-load-balancing-backend',
  });
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
