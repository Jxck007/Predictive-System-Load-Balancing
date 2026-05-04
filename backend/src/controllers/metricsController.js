import { db } from '../db/index.js';

export const getMetrics = async (req, res) => {
  try {
    const metrics = await db.query(
      `SELECT m.*, s.name, s.ip_address, s.status FROM metrics m
       JOIN servers s ON m.server_id = s.id
       ORDER BY m.timestamp DESC`
    );
    res.json(metrics.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getServers = async (req, res) => {
  try {
    const servers = await db.query('SELECT * FROM servers');
    res.json(servers.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
