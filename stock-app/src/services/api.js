// This service can be connected to the Google Apps Script Web App URL.
const API_URL = "https://script.google.com/macros/s/AKfycbyP_zxkwPGsl6mr4tWtEPKQ_8jSpCk4DatuA_2d6fLZry0ymZRUNSBGKM5aAZcCLv98Dg/exec"; 
const USE_MOCK = false; // Set to false to use real GAS API

export const fetchTodayRecommendations = async () => {
  if (USE_MOCK) {
    return [
      { date: '2023-10-27', symbol: 'BBCA.JK', name: 'Bank Central Asia', current_price: 9000, bottom_price: 8900, top_price: 9200, entry_price: 9000, target_price: 9500, stop_loss: 8700, signal: 'BUY', confidence: 85, reasons: 'MA20 Golden Cross, positive earnings' },
      { date: '2023-10-27', symbol: 'GOTO.JK', name: 'GoTo Gojek Tokopedia', current_price: 60, bottom_price: 58, top_price: 65, entry_price: 60, target_price: 70, stop_loss: 55, signal: 'HOLD', confidence: 60, reasons: 'RSI Oversold, waiting for volume' },
      { date: '2023-10-27', symbol: 'TLKM.JK', name: 'Telkom Indonesia', current_price: 3500, bottom_price: 3450, top_price: 3600, entry_price: 3500, target_price: 3300, stop_loss: 3650, signal: 'SELL', confidence: 75, reasons: 'Bearish divergence MACD' },
      { date: '2023-10-27', symbol: 'ASII.JK', name: 'Astra International', current_price: 5800, bottom_price: 5700, top_price: 5900, entry_price: 5800, target_price: 6200, stop_loss: 5600, signal: 'BUY', confidence: 80, margin: '5%' },
      { date: '2023-10-27', symbol: 'BMRI.JK', name: 'Bank Mandiri', current_price: 6000, bottom_price: 5900, top_price: 6100, entry_price: 6000, target_price: 6300, stop_loss: 5800, signal: 'WATCHLIST', confidence: 50, reasons: 'Approaching resistance' },
    ];
  }
  
  const response = await fetch(`${API_URL}?action=getTodayRecommendations`);
  const data = await response.json();
  return data.data;
};

export const fetchMarketSummary = async () => {
  if (USE_MOCK) {
    return { symbol: "IHSG", price: "7200.50", change: "+45.20", changePercent: "+0.63", status: "UP" };
  }
  const response = await fetch(`${API_URL}?action=getMarketSummary`);
  const data = await response.json();
  return data.data;
};

export const fetchPredictionHistory = async () => {
  if (USE_MOCK) {
    return [
      { date: '2023-10-26', symbol: 'BBRI.JK', signal: 'BUY', current_price: 5000, entry_price: 5000, target_price: 5300, stop_loss: 4900, actual_price: 5350, status: 'Benar' },
      { date: '2023-10-26', symbol: 'TLKM.JK', signal: 'SELL', current_price: 3800, entry_price: 3800, target_price: 3500, stop_loss: 4000, actual_price: 3600, status: 'Benar' },
      { date: '2023-10-25', symbol: 'ASII.JK', signal: 'BUY', current_price: 5500, entry_price: 5500, target_price: 5800, stop_loss: 5300, actual_price: 5300, status: 'Salah' },
    ];
  }
  const response = await fetch(`${API_URL}?action=getPredictionHistory`);
  const data = await response.json();
  return data.data;
};

export const fetchAccuracy = async () => {
  if (USE_MOCK) {
    return {
      total: 100,
      correct: 65,
      wrong: 20,
      neutral: 15,
      accuracy: 76.47, // 65 / (65+20)
      chartData: [65, 20, 15]
    };
  }
  const response = await fetch(`${API_URL}?action=getAccuracy`);
  const data = await response.json();
  return data.data;
};

export const fetchStockDetail = async (symbol) => {
  if (USE_MOCK) {
    return {
      symbol: symbol,
      price: 5000,
      ma5: 4950,
      ma20: 4800,
      ma50: 4600,
      rsi: 65,
      macd: "Bullish",
      support: 4700,
      resistance: 5200,
      sentiment: "Positive (75%)",
      fundamental: { PER: 15, PBV: 2.1, ROE: 18, EPS: 350 }
    };
  }
  const response = await fetch(`${API_URL}?action=getStockDetail&symbol=${symbol}`);
  const data = await response.json();
  return data.data;
};
