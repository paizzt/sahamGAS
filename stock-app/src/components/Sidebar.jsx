import React from 'react';
import { NavLink } from 'react-router-dom';
import { LineChart, List, TrendingUp, History, Target, Settings } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const menuItems = [
    { path: '/dashboard', name: 'Dashboard', icon: <LineChart size={20} /> },
    { path: '/recommendations', name: 'Daily Recs', icon: <List size={20} /> },
    { path: '/history', name: 'History', icon: <History size={20} /> },
    { path: '/accuracy', name: 'Accuracy', icon: <Target size={20} /> },
    { path: '/admin', name: 'Admin Settings', icon: <Settings size={20} /> },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <TrendingUp className="logo-icon" size={28} />
        <h2 className="logo-text">StockAI</h2>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink 
                to={item.path} 
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <p className="disclaimer">
          Investing involves risk. Not a financial advice.
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
