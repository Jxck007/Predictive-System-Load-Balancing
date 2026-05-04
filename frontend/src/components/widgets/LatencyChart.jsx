import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const cardStyle = {
  background: '#fff',
  borderRadius: '12px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
  padding: '1rem 1.25rem',
  border: '1px solid rgba(0,0,0,0.06)',
};

const LatencyChart = ({ latencySeries, selectedServer }) => {
  return (
    <div style={cardStyle}>
      <h3 style={{ marginTop: 0, marginBottom: '0.85rem' }}>
        Network Latency Trend <span style={{ color: '#64748b', fontWeight: 400 }}>({selectedServer.name})</span>
      </h3>
      <div style={{ width: '100%', height: 280 }}>
        <ResponsiveContainer>
          <LineChart data={latencySeries}>
            <XAxis dataKey="timestamp" tickFormatter={(value) => value && value.slice(11, 19)} />
            <YAxis />
            <Tooltip labelFormatter={(value) => `Time: ${value.slice(11, 19)}`} />
            <Line type="monotone" dataKey="network_latency" stroke="#0f766e" strokeWidth={2.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LatencyChart;