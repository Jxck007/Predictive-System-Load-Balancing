// Lightweight in-memory mock DB so the app can run without Postgres.
// Implements a minimal async `query(sql)` that returns `{ rows }` and
// supports the SELECT queries used by the app and simple INSERTs from the seed.

const now = () => new Date();

// In-memory tables
const servers = [
  { id: 1, name: 'Server A', ip_address: '192.168.1.10', status: 'active' },
  { id: 2, name: 'Server B', ip_address: '192.168.1.11', status: 'active' },
  { id: 3, name: 'Server C', ip_address: '192.168.1.12', status: 'active' },
];

const metrics = [
  { id: 1, server_id: 1, cpu_usage: 35.2, memory_usage: 60.1, timestamp: new Date(Date.now() - 60 * 1000) },
  { id: 2, server_id: 2, cpu_usage: 55.7, memory_usage: 70.3, timestamp: new Date(Date.now() - 90 * 1000) },
  { id: 3, server_id: 3, cpu_usage: 20.5, memory_usage: 40.2, timestamp: new Date(Date.now() - 30 * 1000) },
];

const predictions = [
  { id: 1, server_id: 1, predicted_load: 40.0, predicted_at: new Date(Date.now() - 60 * 1000) },
  { id: 2, server_id: 2, predicted_load: 60.0, predicted_at: new Date(Date.now() - 60 * 1000) },
  { id: 3, server_id: 3, predicted_load: 25.0, predicted_at: new Date(Date.now() - 60 * 1000) },
];

const routing_weights = [
  { id: 1, server_id: 1, weight: 2 },
  { id: 2, server_id: 2, weight: 1 },
  { id: 3, server_id: 3, weight: 3 },
];

const nextId = (arr) => (arr.length ? Math.max(...arr.map((r) => r.id)) + 1 : 1);

const match = (sql, pattern) => sql && sql.toLowerCase().includes(pattern);

export const db = {
  query: async (sql) => {
    // SELECT metrics joined with servers
    if (match(sql, 'from metrics') && match(sql, 'join servers')) {
      const rows = metrics
        .map((m) => {
          const s = servers.find((sv) => sv.id === m.server_id) || {};
          return { ...m, name: s.name, ip_address: s.ip_address, status: s.status };
        })
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      return { rows };
    }

    // SELECT * FROM servers
    if (match(sql, 'select * from servers') || match(sql, "select s.* from servers")) {
      return { rows: servers.slice() };
    }

    // SELECT predictions joined with servers
    if (match(sql, 'from predictions') && match(sql, 'join servers')) {
      const rows = predictions
        .map((p) => ({ ...p, name: (servers.find((s) => s.id === p.server_id) || {}).name }))
        .sort((a, b) => new Date(b.predicted_at) - new Date(a.predicted_at));
      return { rows };
    }

    // Weighted round-robin selection simplified: compute score = weight / (1 + avg cpu)
    if (match(sql, 'from servers s') && match(sql, 'routing_weights rw')) {
      const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
      const rows = servers
        .filter((s) => s.status === 'active')
        .map((s) => {
          const rw = routing_weights.find((r) => r.server_id === s.id) || { weight: 1 };
          const recentMetrics = metrics.filter((m) => m.server_id === s.id && new Date(m.timestamp).getTime() > fiveMinutesAgo);
          const avgCpu = recentMetrics.length ? recentMetrics.reduce((a, b) => a + b.cpu_usage, 0) / recentMetrics.length : 0;
          return { ...s, weight: rw.weight, cpu_usage: avgCpu };
        })
        .sort((a, b) => (b.weight / (1 + b.cpu_usage)) - (a.weight / (1 + a.cpu_usage))
        )
        .slice(0, 1);
      return { rows };
    }

    // Handle simple SELECTs for routing_weights
    if (match(sql, 'from routing_weights')) {
      return { rows: routing_weights.slice() };
    }

    // Basic INSERT handling for seed.js: detect table and push values.
    if (match(sql, 'insert into servers')) {
      // Quick parsing: look for VALUES and add demo rows if present
      // For simplicity, don't parse values; just ensure the demo servers exist
      return { rows: [] };
    }
    if (match(sql, 'insert into metrics')) {
      return { rows: [] };
    }
    if (match(sql, 'insert into predictions')) {
      return { rows: [] };
    }
    if (match(sql, 'insert into routing_weights')) {
      return { rows: [] };
    }

    // Default: return empty rows to avoid throwing
    return { rows: [] };
  },
};

export const initDb = async () => {
  // Nothing to connect to; already seeded in-memory above.
  console.log('Using in-memory mock DB (no Postgres dependency)');
};
