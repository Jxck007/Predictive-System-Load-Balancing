import React, { useEffect, useState } from 'react';
import { fetchMetrics } from '../utils/api';

const demoMetrics = [
  { name: 'Server A', cpu_usage: 35.2, memory_usage: 60.1, timestamp: new Date().toISOString() },
  { name: 'Server B', cpu_usage: 55.7, memory_usage: 70.3, timestamp: new Date().toISOString() },
  { name: 'Server C', cpu_usage: 20.5, memory_usage: 40.2, timestamp: new Date().toISOString() },
];

const StatusCard = () => {
  const [metrics, setMetrics] = useState(demoMetrics);

  useEffect(() => {
    fetchMetrics().then(setMetrics).catch(() => setMetrics(demoMetrics));
  }, []);

  const latest = metrics[0] || {};

  return (
    <div className="status-card">
      <h2>Status</h2>
      <div>Server: <strong>{latest.name || '-'}</strong></div>
      <div>CPU: <strong>{latest.cpu_usage ? latest.cpu_usage.toFixed(1) : '-'}%</strong></div>
      <div>Memory: <strong>{latest.memory_usage ? latest.memory_usage.toFixed(1) : '-'}%</strong></div>
      <div>Time: <strong>{latest.timestamp ? latest.timestamp.slice(11, 19) : '-'}</strong></div>
    </div>
  );
};

export default StatusCard;
