import React, { useEffect, useState } from 'react';
import { fetchMetrics } from '../utils/api';

const StatusCard = () => {
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    fetchMetrics().then(setMetrics);
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
