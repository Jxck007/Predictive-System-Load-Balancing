import express from 'express';
import metricsRouter from './metrics.js';
import predictionRouter from './prediction.js';
import healthRouter from './health.js';

const router = express.Router();

router.use('/metrics', metricsRouter);
router.use('/prediction', predictionRouter);
router.use('/health', healthRouter);

export default router;
