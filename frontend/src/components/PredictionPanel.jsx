import React, { useEffect, useState } from 'react';
import { fetchPredictions } from '../utils/api';

const demoPredictions = [
  { id: 1, name: 'Server A', predicted_load: 40.0 },
  { id: 2, name: 'Server B', predicted_load: 60.0 },
  { id: 3, name: 'Server C', predicted_load: 25.0 },
];

const PredictionPanel = () => {
  const [predictions, setPredictions] = useState(demoPredictions);

  useEffect(() => {
    fetchPredictions().then(setPredictions).catch(() => setPredictions(demoPredictions));
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
