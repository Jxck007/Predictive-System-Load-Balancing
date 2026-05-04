import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchMetrics } from '../utils/api';
import useSocket from '../hooks/useSocket';

const demoMetrics = [
  { timestamp: new Date(Date.now() - 120000).toISOString(), cpu_usage: 35.2, memory_usage: 60.1 },
  { timestamp: new Date(Date.now() - 60000).toISOString(), cpu_usage: 55.7, memory_usage: 70.3 },
  { timestamp: new Date().toISOString(), cpu_usage: 20.5, memory_usage: 40.2 },
];

const LiveChart = () => {
  const [data, setData] = useState(demoMetrics);

  useEffect(() => {
    fetchMetrics().then(setData).catch(() => setData(demoMetrics));
  }, []);

  useSocket('metrics_update', (newMetric) => {
    setData((prev) => [newMetric, ...prev].slice(0, 20));
  });

  return (
    <div className="live-chart">
      <h2>Live Metrics</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="timestamp" tickFormatter={(t) => t && t.slice(11, 19)} />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="cpu_usage" stroke="#8884d8" name="CPU Usage (%)" />
          <Line type="monotone" dataKey="memory_usage" stroke="#82ca9d" name="Memory Usage (%)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LiveChart;
