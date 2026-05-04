const serverNames = [
  'Server A',
  'Server B',
  'Server C',
  'Server D',
  'Server E',
  'Server F',
];

const baseServers = serverNames.map((name, index) => ({
  id: index + 1,
  name,
  ip_address: `192.168.1.${10 + index}`,
  status: index % 5 === 0 ? 'warning' : 'active',
  region: index % 2 === 0 ? 'us-east' : 'eu-west',
}));

const createSeries = (seed, length = 12) => {
  const now = Date.now();
  return Array.from({ length }, (_, index) => {
    const offset = length - index - 1;
    const variation = Math.sin((seed + index) * 0.85) * 8;
    const cpu = Math.max(8, Math.min(96, seed * 11 + variation + index * 1.2));
    const memory = Math.max(15, Math.min(94, seed * 10 + variation * 0.8 + index * 0.9));
    const disk = Math.max(20, Math.min(98, 42 + seed * 4 + variation * 0.6 + index * 0.5));
    const latency = Math.max(8, Math.min(160, 20 + seed * 6 + variation * 0.4 + index * 0.7));
    const requestRate = Math.max(120, Math.round(550 + seed * 65 + variation * 12 + index * 22));

    return {
      timestamp: new Date(now - offset * 60_000).toISOString(),
      cpu_usage: Number(cpu.toFixed(1)),
      memory_usage: Number(memory.toFixed(1)),
      disk_usage: Number(disk.toFixed(1)),
      network_latency: Number(latency.toFixed(1)),
      request_rate: requestRate,
    };
  });
};

const initialMetrics = baseServers.flatMap((server, index) =>
  createSeries(index + 1).map((entry) => ({
    ...entry,
    server_id: server.id,
    name: server.name,
    ip_address: server.ip_address,
    status: server.status,
  }))
);

const initialPredictions = baseServers.map((server, index) => {
  const latest = createSeries(index + 1).at(-1);
  return {
    id: server.id,
    server_id: server.id,
    name: server.name,
    predicted_load: Number((latest.cpu_usage + index * 3.1).toFixed(1)),
    predicted_at: latest.timestamp,
  };
});

export const mockServers = baseServers;

export const mockMetrics = initialMetrics;

export const mockPredictions = initialPredictions;

export const getServerSeries = (serverId) =>
  mockMetrics
    .filter((entry) => entry.server_id === serverId)
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

export const getServerPrediction = (serverId) =>
  mockPredictions.find((prediction) => prediction.server_id === serverId) || mockPredictions[0];

export const getLatestSnapshot = () => {
  const latestByServer = mockServers.map((server) => {
    const series = getServerSeries(server.id);
    return {
      server,
      latest: series[series.length - 1],
    };
  });

  const topLoaded = latestByServer.reduce((highest, current) => {
    if (!highest) {
      return current;
    }
    return (current.latest?.cpu_usage || 0) > (highest.latest?.cpu_usage || 0) ? current : highest;
  }, null);

  return {
    servers: mockServers,
    latestByServer,
    topLoaded,
  };
};

export const getTrafficDistribution = () =>
  mockServers.map((server) => {
    const series = getServerSeries(server.id);
    const latest = series[series.length - 1] || {};
    return {
      name: server.name,
      value: latest.request_rate || 0,
      serverId: server.id,
    };
  });

export const getLatencySeries = (serverId) =>
  getServerSeries(serverId).map((entry) => ({
    timestamp: entry.timestamp,
    network_latency: entry.network_latency,
  }));

const jitter = (value, spread, min, max) => {
  const delta = (Math.random() - 0.5) * spread;
  return Number(Math.max(min, Math.min(max, value + delta)).toFixed(1));
};

export const tickMockData = () => {
  const latestPerServer = new Map();

  mockMetrics.forEach((entry) => {
    const current = latestPerServer.get(entry.server_id);
    const currentTimestamp = new Date(entry.timestamp).getTime();
    if (!current || currentTimestamp > new Date(current.timestamp).getTime()) {
      latestPerServer.set(entry.server_id, entry);
    }
  });

  mockServers.forEach((server) => {
    const current = latestPerServer.get(server.id);
    if (!current) {
      return;
    }

    const updated = {
      ...current,
      timestamp: new Date().toISOString(),
      cpu_usage: jitter(current.cpu_usage, 4, 5, 98),
      memory_usage: jitter(current.memory_usage, 3.5, 10, 97),
      disk_usage: jitter(current.disk_usage, 1.5, 15, 99),
      network_latency: jitter(current.network_latency, 6, 5, 180),
      request_rate: Math.round(jitter(current.request_rate, 70, 90, 2000)),
    };

    mockMetrics.push(updated);

    const serverPrediction = mockPredictions.find((prediction) => prediction.server_id === server.id);
    if (serverPrediction) {
      serverPrediction.predicted_load = Number((updated.cpu_usage + Math.random() * 6 - 3).toFixed(1));
      serverPrediction.predicted_at = updated.timestamp;
    }
  });
};
