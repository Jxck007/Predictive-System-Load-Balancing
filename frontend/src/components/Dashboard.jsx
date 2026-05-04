import React from 'react';
import PredictionPanel from './PredictionPanel.jsx';
import ServerList from './ServerList.jsx';
import LiveChart from './LiveChart.jsx';
import StatusCard from './StatusCard.jsx';
import './Dashboard.css';

const Dashboard = () => (
  <div className="dashboard-container">
    <div className="dashboard-header">
      <h1>Predictive System Load Balancing</h1>
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
  </div>
);

export default Dashboard;
