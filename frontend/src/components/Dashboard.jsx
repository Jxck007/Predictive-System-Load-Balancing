import React, { useEffect, useState } from 'react';
import PredictionPanel from './PredictionPanel.jsx';
import ServerList from './ServerList.jsx';
import LiveChart from './LiveChart.jsx';
import StatusCard from './StatusCard.jsx';
import SystemOverview from './widgets/SystemOverview.jsx';
import TopServer from './widgets/TopServer.jsx';
import HealthStatus from './widgets/HealthStatus.jsx';
import RequestChart from './widgets/RequestChart.jsx';
import LatencyChart from './widgets/LatencyChart.jsx';
import {
  getLatestSnapshot,
  getLatencySeries,
  getTrafficDistribution,
  mockServers,
  tickMockData,
} from '../data/mockData.js';
import './Dashboard.css';

const Dashboard = () => {
  const [selectedServerId, setSelectedServerId] = useState(mockServers[0]?.id || 1);
  const [refreshIndex, setRefreshIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      tickMockData();
      setRefreshIndex((current) => current + 1);
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  const snapshot = getLatestSnapshot();
  const selectedServer = mockServers.find((server) => server.id === selectedServerId) || mockServers[0];
  const latencySeries = getLatencySeries(selectedServer.id);
  const requestDistribution = getTrafficDistribution();

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Predictive System Load Balancing</h1>
      </div>

      <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 600 }}>
          Selected Server
          <select
            value={selectedServerId}
            onChange={(event) => setSelectedServerId(Number(event.target.value))}
            style={{
              borderRadius: '10px',
              border: '1px solid #cbd5e1',
              padding: '0.55rem 0.75rem',
              background: '#fff',
              minWidth: '180px',
            }}
          >
            {mockServers.map((server) => (
              <option key={server.id} value={server.id}>
                {server.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="dashboard-main">
        <div className="dashboard-left">
          <StatusCard />
          <ServerList />
        </div>
        <div className="dashboard-center">
          <LiveChart />
        </div>
        <div className="dashboard-right">
          <PredictionPanel />
        </div>
      </div>

      <div
        style={{
          marginTop: '1.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem',
        }}
      >
        <div>
          <SystemOverview servers={snapshot.servers} latestByServer={snapshot.latestByServer} refreshIndex={refreshIndex} />
        </div>
        <div>
          <TopServer topLoaded={snapshot.topLoaded} refreshIndex={refreshIndex} />
        </div>
        <div>
          <HealthStatus selectedServer={selectedServer} latestByServer={snapshot.latestByServer} refreshIndex={refreshIndex} />
        </div>
        <div>
          <RequestChart distribution={requestDistribution} selectedServer={selectedServer} refreshIndex={refreshIndex} />
        </div>
        <div>
          <LatencyChart latencySeries={latencySeries} selectedServer={selectedServer} refreshIndex={refreshIndex} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
