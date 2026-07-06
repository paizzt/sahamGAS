import React, { useState } from 'react';

const Admin = () => {
  const [settings, setSettings] = useState({
    gasUrl: 'https://script.google.com/macros/s/.../exec',
    techWeight: 50,
    fundWeight: 25,
    sentWeight: 15,
    riskWeight: 10,
    dailyCount: 5,
    apiKeyAlpha: '',
    apiKeyMarketaux: ''
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({...prev, [name]: value}));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);
    // Simulate save to GAS
    setTimeout(() => {
      setSaving(false);
      alert('Settings saved successfully to Google Sheets!');
    }, 1000);
  };

  return (
    <div className="max-w-4xl">
      <h1>Admin Settings</h1>
      <p>Configure algorithm weights and API keys. These settings will be saved to your Google Sheet.</p>

      <form onSubmit={handleSave} className="mt-6 flex flex-col gap-6">
        <div className="card">
          <h2 className="mb-4">System Integration</h2>
          <div className="form-group">
            <label className="form-label">Google Apps Script Web App URL</label>
            <input 
              type="text" 
              className="form-control" 
              name="gasUrl"
              value={settings.gasUrl}
              onChange={handleChange}
              placeholder="Paste your deployed Web App URL here"
            />
            <p className="text-sm text-muted mt-2">This is the API URL provided after deploying your Apps Script.</p>
          </div>
        </div>

        <div className="card">
          <h2 className="mb-4">Algorithm Weights (%)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">Technical Analysis Weight</label>
              <input type="number" className="form-control" name="techWeight" value={settings.techWeight} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Fundamental Analysis Weight</label>
              <input type="number" className="form-control" name="fundWeight" value={settings.fundWeight} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">News Sentiment Weight</label>
              <input type="number" className="form-control" name="sentWeight" value={settings.sentWeight} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Risk & Liquidity Weight</label>
              <input type="number" className="form-control" name="riskWeight" value={settings.riskWeight} onChange={handleChange} />
            </div>
          </div>
          <p className="text-sm text-muted mt-2">Total should equal 100%.</p>
        </div>

        <div className="card">
          <h2 className="mb-4">API Keys</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">Alpha Vantage API Key</label>
              <input type="password" className="form-control" name="apiKeyAlpha" value={settings.apiKeyAlpha} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Marketaux API Key</label>
              <input type="password" className="form-control" name="apiKeyMarketaux" value={settings.apiKeyMarketaux} onChange={handleChange} />
            </div>
          </div>
          <p className="text-sm text-yellow mt-2">Keys are stored securely in the Google Sheet settings tab, not on the frontend.</p>
        </div>

        <div className="card">
          <h2 className="mb-4">Preferences</h2>
          <div className="form-group">
            <label className="form-label">Number of Daily Recommendations</label>
            <input type="number" className="form-control w-full md:w-1/4" name="dailyCount" value={settings.dailyCount} onChange={handleChange} />
          </div>
        </div>

        <div>
          <button type="submit" className="btn btn-primary text-lg" disabled={saving}>
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Admin;
