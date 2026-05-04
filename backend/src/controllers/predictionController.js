import { db } from '../db/index.js';

export const getPrediction = async (req, res) => {
  try {
    // For demo, return latest predictions for all servers
    const predictions = await db.query(
      `SELECT p.*, s.name FROM predictions p
       JOIN servers s ON p.server_id = s.id
       ORDER BY p.predicted_at DESC`
    );
    res.json(predictions.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
