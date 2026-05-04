import React from 'react';

const cardStyle = {
  background: '#fff',
  borderRadius: '12px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
  padding: '1rem 1.25rem',
  border: '1px solid rgba(0,0,0,0.06)',
};

const SystemOverview = ({ servers, latestByServer }) => {
  const activeServers = servers.filter((server) => server.status === 'active').length;
  const averages = latestByServer.reduce(
    (accumulator, item) => {
      accumulator.cpu += item.latest?.cpu_usage || 0;
      accumulator.memory += item.latest?.memory_usage || 0;
      return accumulator;
    },
    { cpu: 0, memory: 0 }
  );

  const total = servers.length || 1;

  return (
    <div style={cardStyle}>
      <h3 style={{ marginTop: 0, marginBottom: '0.85rem' }}>System Overview</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0.75rem' }}>
        <Stat label="Total Servers" value={servers.length} />
        <Stat label="Active Servers" value={activeServers} />
        <Stat label="Average CPU" value={`${(averages.cpu / total).toFixed(1)}%`} />
        <Stat label="Average Memory" value={`${(averages.memory / total).toFixed(1)}%`} />
      </div>
    </div>
  );
};

const Stat = ({ label, value }) => (
  <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '0.75rem' }}>
    <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '0.35rem' }}>{label}</div>
    <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{value}</div>
  </div>
);

export default SystemOverview;