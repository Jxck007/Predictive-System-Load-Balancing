import React, { useEffect, useState } from 'react';
import { fetchServers } from '../utils/api';

const ServerList = () => {
  const [servers, setServers] = useState([]);

  useEffect(() => {
    fetchServers().then(setServers);
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
