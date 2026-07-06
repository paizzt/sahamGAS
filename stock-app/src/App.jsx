import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Recommendations from './pages/Recommendations';
import StockDetail from './pages/StockDetail';
import History from './pages/History';
import Accuracy from './pages/Accuracy';
import Admin from './pages/Admin';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/stock/:symbol" element={<StockDetail />} />
            <Route path="/history" element={<History />} />
            <Route path="/accuracy" element={<Accuracy />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
