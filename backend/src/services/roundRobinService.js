import { db } from '../db/index.js';

export const getNextServer = async () => {
  // Weighted round robin: select server with highest (weight / (1 + current load))
  const { rows: servers } = await db.query(
    `SELECT s.*, rw.weight, COALESCE(m.cpu_usage, 0) as cpu_usage
     FROM servers s
     JOIN routing_weights rw ON s.id = rw.server_id
     LEFT JOIN (
       SELECT server_id, AVG(cpu_usage) as cpu_usage
       FROM metrics
       WHERE timestamp > NOW() - INTERVAL '5 minutes'
       GROUP BY server_id
     ) m ON s.id = m.server_id
     WHERE s.status = 'active'
     ORDER BY (rw.weight::float / (1 + COALESCE(m.cpu_usage, 0))) DESC
     LIMIT 1`
  );
  return servers[0];
};
