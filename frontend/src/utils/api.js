const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export const fetchMetrics = async () => {
  const res = await fetch(`${API_URL}/metrics`);
  return res.json();
};

export const fetchServers = async () => {
  const res = await fetch(`${API_URL}/metrics/servers`);
  return res.json();
};

export const fetchPredictions = async () => {
  const res = await fetch(`${API_URL}/prediction`);
  return res.json();
};
