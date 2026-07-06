import React, { useEffect, useState } from 'react';
import { fetchPredictionHistory } from '../services/api';
import { Link } from 'react-router-dom';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [filterSymbol, setFilterSymbol] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterSignal, setFilterSignal] = useState('');

  useEffect(() => {
    fetchPredictionHistory().then(data => {
      setHistory(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-6">Loading history...</div>;

  const filteredHistory = history.filter(item => {
    return (
      (filterSymbol === '' || item.symbol.toLowerCase().includes(filterSymbol.toLowerCase())) &&
      (filterStatus === '' || item.status.toLowerCase() === filterStatus.toLowerCase()) &&
      (filterSignal === '' || item.signal.toLowerCase() === filterSignal.toLowerCase())
    );
  });

  return (
    <div>
      <h1>Prediction History</h1>
      <p>A transparent log of all our past predictions and their real outcomes.</p>

      <div className="card mt-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="form-group mb-0">
            <label className="form-label">Symbol</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="e.g. BBCA.JK"
              value={filterSymbol}
              onChange={(e) => setFilterSymbol(e.target.value)}
            />
          </div>
          <div className="form-group mb-0">
            <label className="form-label">Status</label>
            <select className="form-control" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="">All Status</option>
              <option value="benar">Benar</option>
              <option value="salah">Salah</option>
              <option value="netral">Netral</option>
            </select>
          </div>
          <div className="form-group mb-0">
            <label className="form-label">Signal</label>
            <select className="form-control" value={filterSignal} onChange={(e) => setFilterSignal(e.target.value)}>
              <option value="">All Signals</option>
              <option value="buy">BUY</option>
              <option value="sell">SELL</option>
              <option value="hold">HOLD</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="btn btn-outline w-full" onClick={() => {
              setFilterSymbol('');
              setFilterStatus('');
              setFilterSignal('');
            }}>Reset Filters</button>
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Symbol</th>
                <th>Signal</th>
                <th>Entry</th>
                <th>Target</th>
                <th>Stop Loss</th>
                <th>Actual Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.date ? new Date(item.date).toLocaleDateString() : '-'}</td>
                  <td>
                    <Link to={`/stock/${item.symbol}`} className="font-bold text-accent-primary" style={{textDecoration: 'none'}}>
                      {item.symbol}
                    </Link>
                  </td>
                  <td><span className={`badge badge-${item.signal?.toLowerCase()}`}>{item.signal}</span></td>
                  <td>Rp {item.entry_price?.toLocaleString()}</td>
                  <td>Rp {item.target_price?.toLocaleString()}</td>
                  <td>Rp {item.stop_loss?.toLocaleString()}</td>
                  <td>Rp {item.actual_price?.toLocaleString()}</td>
                  <td>
                    <span className={
                      item.status?.toLowerCase() === 'benar' ? 'text-green font-bold' : 
                      item.status?.toLowerCase() === 'salah' ? 'text-red font-bold' : 'text-yellow font-bold'
                    }>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredHistory.length === 0 && <p className="p-4 text-center">No matching history found.</p>}
        </div>
      </div>
    </div>
  );
};

export default History;
