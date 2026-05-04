import React from 'react';

const cardStyle = {
  background: '#fff',
  borderRadius: '12px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
  padding: '1rem 1.25rem',
  border: '1px solid rgba(0,0,0,0.06)',
};

const getHealth = (cpu) => {
  if (cpu < 55) return { label: 'Healthy', color: '#16a34a' };
  if (cpu < 80) return { label: 'Warning', color: '#d97706' };
  return { label: 'Critical', color: '#dc2626' };
};

const HealthStatus = ({ selectedServer, latestByServer }) => {
  const active = latestByServer.find((item) => item.server.id === selectedServer.id) || latestByServer[0];
  const cpu = active?.latest?.cpu_usage || 0;
  const health = getHealth(cpu);

  return (
    <div style={cardStyle}>
      <h3 style={{ marginTop: 0, marginBottom: '0.85rem' }}>Server Health Status</h3>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
        <div>
          <div style={{ fontWeight: 700 }}>{active?.server?.name || '-'}</div>
          <div style={{ color: '#64748b', fontSize: '0.9rem' }}>CPU threshold based health</div>
        </div>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            borderRadius: '999px',
            padding: '0.35rem 0.8rem',
            color: '#fff',
            background: health.color,
            fontWeight: 700,
          }}
        >
          {health.label}
        </span>
      </div>
      <div style={{ marginTop: '0.85rem', color: '#475569' }}>Current CPU: <strong>{cpu.toFixed(1)}%</strong></div>
    </div>
  );
};

export default HealthStatus;