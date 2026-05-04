// For demo, this is a mock. In production, call ML service or use real model.
export const predictLoad = async (serverId) => {
  // Return a random prediction for demo
  return {
    serverId,
    predictedLoad: Math.random() * 100,
    predictedAt: new Date().toISOString(),
  };
};
