import React, { useEffect, useState } from 'react';
import { fetchServers } from '../utils/api';

const demoServers = [
  { id: 1, name: 'Server A', ip_address: '192.168.1.10', status: 'active' },
  { id: 2, name: 'Server B', ip_address: '192.168.1.11', status: 'active' },
  { id: 3, name: 'Server C', ip_address: '192.168.1.12', status: 'active' },
];

const ServerList = () => {
  const [servers, setServers] = useState(demoServers);

  useEffect(() => {
    fetchServers().then(setServers).catch(() => setServers(demoServers));
  }, []);

  return (
    <div className="server-list">
      <h2>Servers</h2>
      <ul>
        {servers.map((s) => (
          <li key={s.id}>
            <strong>{s.name}</strong> ({s.ip_address}) - {s.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServerList;
