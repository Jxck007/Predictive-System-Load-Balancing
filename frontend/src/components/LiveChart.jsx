import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchMetrics } from '../utils/api';
import useSocket from '../hooks/useSocket';

const LiveChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchMetrics().then(setData);
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
