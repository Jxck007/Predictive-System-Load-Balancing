import React from 'react';

const boxStyle = {
  background: '#fff',
  borderRadius: '12px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
  padding: '1rem 1.25rem',
  border: '1px solid rgba(220, 38, 38, 0.16)',
};

const TopServer = ({ topLoaded }) => {
  const cpu = topLoaded?.latest?.cpu_usage || 0;

  return (
    <div style={boxStyle}>
      <h3 style={{ marginTop: 0, marginBottom: '0.85rem', color: '#b91c1c' }}>Top Loaded Server</h3>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '1.05rem', fontWeight: 700 }}>{topLoaded?.server?.name || '-'}</div>
          <div style={{ color: '#64748b', fontSize: '0.9rem' }}>{topLoaded?.server?.ip_address || '-'}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#dc2626' }}>{cpu.toFixed(1)}%</div>
          <div style={{ color: '#64748b', fontSize: '0.82rem' }}>CPU Usage</div>
        </div>
      </div>
    </div>
  );
};

export default TopServer;