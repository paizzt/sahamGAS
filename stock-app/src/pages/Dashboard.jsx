import React, { useEffect, useState } from 'react';
import { fetchTodayRecommendations, fetchAccuracy, fetchMarketSummary } from '../services/api';
import { TrendingUp, TrendingDown, Minus, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [recs, setRecs] = useState([]);
  const [accuracy, setAccuracy] = useState(null);
  const [marketSummary, setMarketSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [recsData, accData, marketData] = await Promise.all([
          fetchTodayRecommendations(),
          fetchAccuracy(),
          fetchMarketSummary()
        ]);
        setRecs(recsData);
        setAccuracy(accData);
        setMarketSummary(marketData);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const getSignalBadge = (signal) => {
    const s = signal?.toUpperCase();
    if (s === 'BUY') return <span className="badge badge-buy"><TrendingUp size={14}/> BUY</span>;
    if (s === 'SELL') return <span className="badge badge-sell"><TrendingDown size={14}/> SELL</span>;
    if (s === 'HOLD') return <span className="badge badge-hold"><Minus size={14}/> HOLD</span>;
    return <span className="badge badge-watchlist"><Target size={14}/> WATCHLIST</span>;
  };

  if (loading) return <div className="p-6">Loading dashboard...</div>;

  return (
    <div className="dashboard">
      <div className="flex justify-between items-center mb-6">
        <h1>Market Overview</h1>
        {marketSummary && (
          <div className="card px-4 py-2 flex items-center gap-4" style={{margin:0}}>
            <div>
              <p className="text-sm text-muted font-bold">IHSG (^JKSE)</p>
              <p className="text-xl font-bold">{marketSummary.price}</p>
            </div>
            <div className={`text-right ${marketSummary.status === 'UP' ? 'text-green' : 'text-red'}`}>
              <p className="font-bold flex items-center justify-end gap-1">
                {marketSummary.status === 'UP' ? <TrendingUp size={16}/> : <TrendingDown size={16}/>}
                {marketSummary.change > 0 ? '+' : ''}{marketSummary.change}
              </p>
              <p className="text-sm">({marketSummary.changePercent > 0 ? '+' : ''}{marketSummary.changePercent}%)</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="card">
          <h3 className="text-muted">Total Predictions</h3>
          <p className="text-2xl font-bold mt-2">{accuracy?.total || 0}</p>
        </div>
        <div className="card">
          <h3 className="text-muted">System Accuracy</h3>
          <p className="text-2xl font-bold mt-2 text-green">{accuracy?.accuracy || 0}%</p>
        </div>
        <div className="card">
          <h3 className="text-muted">Active Recommendations</h3>
          <p className="text-2xl font-bold mt-2">{recs.length}</p>
        </div>
      </div>

      <h2>Today's Recommendations</h2>
      <div className="grid grid-cols-1 gap-4 mt-4">
        {recs.map((rec, idx) => (
          <div key={idx} className="card flex items-center justify-between">
            <div>
              <Link to={`/stock/${rec.symbol}`} style={{textDecoration: 'none'}}>
                <h3 className="text-xl text-primary hover:text-accent-primary">{rec.symbol}</h3>
              </Link>
              <p className="text-sm">{rec.name}</p>
              <div className="mt-2 text-sm">
                <span className="text-muted">Entry:</span> Rp {rec.entry_price?.toLocaleString()} &nbsp;|&nbsp; 
                <span className="text-muted"> Target:</span> Rp {rec.target_price?.toLocaleString()} &nbsp;|&nbsp; 
                <span className="text-muted"> Stop Loss:</span> Rp {rec.stop_loss?.toLocaleString()}
              </div>
              <p className="text-sm mt-2 text-muted"><strong>Reason:</strong> {rec.reasons}</p>
            </div>
            <div className="flex flex-col items-end">
              <div className="mb-2">
                {getSignalBadge(rec.signal)}
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">Rp {rec.current_price?.toLocaleString()}</p>
                <p className="text-sm text-muted">Confidence: {rec.confidence}%</p>
              </div>
            </div>
          </div>
        ))}
        {recs.length === 0 && <p>No recommendations for today yet.</p>}
      </div>
    </div>
  );
};

export default Dashboard;
