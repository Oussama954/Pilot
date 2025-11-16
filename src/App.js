import { useState, useEffect } from 'react';

export default function CounterApp() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  
  // Change this to your API URL (localhost for dev, your deployed URL for production)
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
  const COUNTER_NAME = 'main';

  // Fetch counter on mount
  useEffect(() => {
    fetchCounter();
  }, []);

  const fetchCounter = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/counter/${COUNTER_NAME}`);
      const data = await response.json();
      setCount(data.value);
      setError(null);
    } catch (err) {
      setError('Failed to fetch counter. Make sure the API is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await fetch(`${API_URL}/api/counter/${COUNTER_NAME}/history?limit=10`);
      const data = await response.json();
      setHistory(data.history);
    } catch (err) {
      console.error('Failed to fetch history:', err);
    }
  };

  const handleIncrement = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/counter/${COUNTER_NAME}/increment`, {
        method: 'POST',
      });
      const data = await response.json();
      setCount(data.value);
      setError(null);
      if (showHistory) fetchHistory();
    } catch (err) {
      setError('Failed to increment counter');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDecrement = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/counter/${COUNTER_NAME}/decrement`, {
        method: 'POST',
      });
      const data = await response.json();
      setCount(data.value);
      setError(null);
      if (showHistory) fetchHistory();
    } catch (err) {
      setError('Failed to decrement counter');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/counter/${COUNTER_NAME}/reset`, {
        method: 'POST',
      });
      const data = await response.json();
      setCount(data.value);
      setError(null);
      if (showHistory) fetchHistory();
    } catch (err) {
      setError('Failed to reset counter');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
    if (!showHistory) {
      fetchHistory();
    }
  };

  if (loading && count === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-2xl text-gray-700">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Counter App
          </h1>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${error ? 'bg-red-500' : 'bg-green-500'}`}></div>
            <span className="text-sm text-gray-600">
              {error ? 'Offline' : 'Connected'}
            </span>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-8 mb-8">
          <div className="text-center">
            <p className="text-white text-lg mb-2">Current Count</p>
            <p className="text-white text-7xl font-bold">{count}</p>
            <p className="text-blue-100 text-sm mt-2">Synced with database</p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <button
            onClick={handleIncrement}
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition duration-200 transform hover:scale-105 active:scale-95 shadow-lg disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Increment (+1)'}
          </button>
          
          <button
            onClick={handleDecrement}
            disabled={loading}
            className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition duration-200 transform hover:scale-105 active:scale-95 shadow-lg disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Decrement (-1)'}
          </button>
          
          <button
            onClick={handleReset}
            disabled={loading}
            className="w-full bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition duration-200 transform hover:scale-105 active:scale-95 shadow-lg disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Reset'}
          </button>
        </div>

        <button
          onClick={toggleHistory}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 mb-4"
        >
          {showHistory ? 'Hide History' : 'Show History'}
        </button>

        {showHistory && (
          <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
            <h3 className="font-semibold text-gray-700 mb-3">Recent Actions</h3>
            {history.length === 0 ? (
              <p className="text-gray-500 text-sm">No history yet</p>
            ) : (
              <div className="space-y-2">
                {history.map((item) => (
                  <div key={item.id} className="flex justify-between items-center bg-white p-3 rounded shadow-sm">
                    <div>
                      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                        item.action === 'increment' ? 'bg-green-100 text-green-800' :
                        item.action === 'decrement' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {item.action}
                      </span>
                      <span className="ml-2 text-gray-700">Value: {item.value}</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(item.createdAt).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="mt-6 text-center text-sm text-gray-500">
          Data persisted in Supabase PostgreSQL
        </div>
      </div>
    </div>
  );
}