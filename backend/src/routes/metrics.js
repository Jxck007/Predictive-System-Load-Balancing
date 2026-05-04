import express from 'express';
import { getMetrics, getServers } from '../controllers/metricsController.js';

const router = express.Router();

router.get('/', getMetrics);
router.get('/servers', getServers);

export default router;
