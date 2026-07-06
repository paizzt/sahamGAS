import React, { useEffect, useState } from 'react';
import { fetchAccuracy } from '../services/api';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Accuracy = () => {
  const [accuracyData, setAccuracyData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAccuracy().then(data => {
      setAccuracyData(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-6">Loading accuracy data...</div>;

  const chartData = {
    labels: ['Correct', 'Wrong', 'Neutral'],
    datasets: [
      {
        data: accuracyData?.chartData || [0, 0, 0],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)', // Green
          'rgba(239, 68, 68, 0.8)',  // Red
          'rgba(245, 158, 11, 0.8)', // Yellow
        ],
        borderColor: [
          'rgba(16, 185, 129, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(245, 158, 11, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h1>System Accuracy</h1>
      <p>Performance metrics of our stock recommendation AI.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <div className="card text-center">
          <h3 className="text-muted">Total Predictions</h3>
          <p className="text-3xl font-bold mt-2">{accuracyData?.total}</p>
        </div>
        <div className="card text-center border" style={{borderColor: 'rgba(16, 185, 129, 0.5)'}}>
          <h3 className="text-green">Correct</h3>
          <p className="text-3xl font-bold mt-2 text-green">{accuracyData?.correct}</p>
        </div>
        <div className="card text-center border" style={{borderColor: 'rgba(239, 68, 68, 0.5)'}}>
          <h3 className="text-red">Wrong</h3>
          <p className="text-3xl font-bold mt-2 text-red">{accuracyData?.wrong}</p>
        </div>
        <div className="card text-center border" style={{borderColor: 'rgba(59, 130, 246, 0.5)'}}>
          <h3 className="text-accent-primary">Overall Accuracy</h3>
          <p className="text-3xl font-bold mt-2 text-accent-primary">{accuracyData?.accuracy}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="card flex items-center justify-center flex-col">
          <h2 className="mb-4">Prediction Distribution</h2>
          <div style={{width: '300px', height: '300px'}}>
            <Doughnut data={chartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        <div className="card">
          <h2 className="mb-4">Additional Metrics</h2>
          <ul className="flex flex-col gap-4">
            <li className="flex justify-between items-center p-4" style={{backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 'var(--border-radius-md)'}}>
              <span>7-Day Accuracy</span>
              <span className="font-bold text-green">78.5%</span>
            </li>
            <li className="flex justify-between items-center p-4" style={{backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 'var(--border-radius-md)'}}>
              <span>30-Day Accuracy</span>
              <span className="font-bold text-green">75.2%</span>
            </li>
            <li className="flex justify-between items-center p-4" style={{backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 'var(--border-radius-md)'}}>
              <span>Average Return (Correct)</span>
              <span className="font-bold text-green">+4.2%</span>
            </li>
            <li className="flex justify-between items-center p-4" style={{backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 'var(--border-radius-md)'}}>
              <span>Average Loss (Wrong)</span>
              <span className="font-bold text-red">-2.5%</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Accuracy;
