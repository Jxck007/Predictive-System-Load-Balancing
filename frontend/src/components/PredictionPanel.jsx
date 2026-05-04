import React, { useEffect, useState } from 'react';
import { fetchPredictions } from '../utils/api';

const PredictionPanel = () => {
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    fetchPredictions().then(setPredictions);
  }, []);

  return (
    <div className="prediction-panel">
      <h2>Predictions</h2>
      <ul>
        {predictions.map((p) => (
          <li key={p.id}>
            <strong>{p.name}</strong>: {p.predicted_load.toFixed(1)}%
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PredictionPanel;
