import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const colors = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

const cardStyle = {
  background: '#fff',
  borderRadius: '12px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
  padding: '1rem 1.25rem',
  border: '1px solid rgba(0,0,0,0.06)',
};

const RequestChart = ({ distribution, selectedServer }) => {
  const data = distribution;

  return (
    <div style={cardStyle}>
      <h3 style={{ marginTop: 0, marginBottom: '0.85rem' }}>Request Distribution</h3>
      <div style={{ width: '100%', height: 280 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={95}
              innerRadius={55}
              paddingAngle={3}
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.serverId}
                  fill={entry.serverId === selectedServer.id ? '#dc2626' : colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RequestChart;