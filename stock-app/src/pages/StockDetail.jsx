import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchStockDetail } from '../services/api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const StockDetail = () => {
  const { symbol } = useParams();
  const [stock, setStock] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStockDetail(symbol).then(data => {
      setStock(data);
      setLoading(false);
    });
  }, [symbol]);

  if (loading) return <div className="p-6">Loading stock details...</div>;
  if (!stock) return <div className="p-6">Stock not found.</div>;

  const chartData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [
      {
        fill: true,
        label: 'Price',
        data: [
          stock.price * 0.95,
          stock.price * 0.96,
          stock.price * 0.94,
          stock.price * 0.98,
          stock.price * 0.99,
          stock.price * 1.01,
          stock.price,
        ],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
      },
      {
        label: 'MA5',
        data: Array(7).fill(stock.ma5),
        borderColor: 'rgba(245, 158, 11, 0.8)',
        borderDash: [5, 5],
        pointRadius: 0
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: false },
    },
    scales: {
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      },
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1>{stock.symbol}</h1>
          <p className="text-xl font-bold">Rp {stock.price?.toLocaleString()}</p>
        </div>
        <div className="card text-center p-4">
          <p className="text-sm text-muted">Final Recommendation</p>
          <div className="mt-2 text-xl font-bold text-green">BUY</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card">
          <h2 className="mb-4">Price Chart (7 Days)</h2>
          <Line options={chartOptions} data={chartData} />
        </div>

        <div className="flex flex-col gap-6">
          <div className="card">
            <h2>Technical Indicators</h2>
            <ul className="mt-4 flex flex-col gap-2">
              <li className="flex justify-between">
                <span className="text-muted">MA5</span> <span>{stock.ma5}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted">MA20</span> <span>{stock.ma20}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted">MA50</span> <span>{stock.ma50}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted">RSI</span> <span>{stock.rsi}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted">MACD</span> <span>{stock.macd}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted">Support</span> <span className="text-red">{stock.support}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted">Resistance</span> <span className="text-green">{stock.resistance}</span>
              </li>
            </ul>
          </div>

          <div className="card">
            <h2>Fundamental & Sentiment</h2>
            <ul className="mt-4 flex flex-col gap-2">
              <li className="flex justify-between">
                <span className="text-muted">PER</span> <span>{stock.fundamental?.PER}x</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted">PBV</span> <span>{stock.fundamental?.PBV}x</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted">ROE</span> <span>{stock.fundamental?.ROE}%</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted">EPS</span> <span>Rp {stock.fundamental?.EPS}</span>
              </li>
              <li className="flex justify-between mt-2 border-t border-glass pt-2" style={{borderColor: 'var(--glass-border)'}}>
                <span className="text-muted">News Sentiment</span> 
                <span className="text-green font-bold">{stock.sentiment}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockDetail;
