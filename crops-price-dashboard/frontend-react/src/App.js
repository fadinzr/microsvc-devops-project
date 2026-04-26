// frontend-react/src/App.js
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const crops = ['Rice', 'Wheat', 'Lentils'];
const regions = ['Dhaka', 'Chittagong', 'Sylhet'];

// --- Mocked data for offline mode ---
const mockData = {
  Rice: {
    Dhaka: {
      historical: [
        { date: 'Jan', price: 50 },
        { date: 'Feb', price: 52 },
        { date: 'Mar', price: 54 },
        { date: 'Apr', price: 55 },
        { date: 'May', price: 57 },
      ],
      trend: {
        trend: [
          { date: 'Jun', price: 58 },
          { date: 'Jul', price: 59 },
          { date: 'Aug', price: 60 },
        ],
      },
    },
    Chittagong: {
      historical: [
        { date: 'Jan', price: 48 },
        { date: 'Feb', price: 49 },
        { date: 'Mar', price: 51 },
        { date: 'Apr', price: 52 },
        { date: 'May', price: 54 },
      ],
      trend: {
        trend: [
          { date: 'Jun', price: 55 },
          { date: 'Jul', price: 56 },
          { date: 'Aug', price: 58 },
        ],
      },
    },
    Sylhet: {
      historical: [
        { date: 'Jan', price: 47 },
        { date: 'Feb', price: 48 },
        { date: 'Mar', price: 49 },
        { date: 'Apr', price: 51 },
        { date: 'May', price: 52 },
      ],
      trend: {
        trend: [
          { date: 'Jun', price: 53 },
          { date: 'Jul', price: 54 },
          { date: 'Aug', price: 56 },
        ],
      },
    },
  },
  Wheat: {
    Dhaka: {
      historical: [
        { date: 'Jan', price: 40 },
        { date: 'Feb', price: 42 },
        { date: 'Mar', price: 43 },
        { date: 'Apr', price: 44 },
        { date: 'May', price: 45 },
      ],
      trend: { trend: [{ date: 'Jun', price: 46 }, { date: 'Jul', price: 47 }, { date: 'Aug', price: 48 }] },
    },
    Chittagong: {
      historical: [
        { date: 'Jan', price: 39 },
        { date: 'Feb', price: 40 },
        { date: 'Mar', price: 41 },
        { date: 'Apr', price: 42 },
        { date: 'May', price: 43 },
      ],
      trend: { trend: [{ date: 'Jun', price: 44 }, { date: 'Jul', price: 45 }, { date: 'Aug', price: 46 }] },
    },
    Sylhet: {
      historical: [
        { date: 'Jan', price: 38 },
        { date: 'Feb', price: 39 },
        { date: 'Mar', price: 40 },
        { date: 'Apr', price: 41 },
        { date: 'May', price: 42 },
      ],
      trend: { trend: [{ date: 'Jun', price: 43 }, { date: 'Jul', price: 44 }, { date: 'Aug', price: 45 }] },
    },
  },
  Lentils: {
    Dhaka: {
      historical: [
        { date: 'Jan', price: 65 },
        { date: 'Feb', price: 66 },
        { date: 'Mar', price: 67 },
        { date: 'Apr', price: 68 },
        { date: 'May', price: 69 },
      ],
      trend: { trend: [{ date: 'Jun', price: 70 }, { date: 'Jul', price: 71 }, { date: 'Aug', price: 72 }] },
    },
    Chittagong: {
      historical: [
        { date: 'Jan', price: 63 },
        { date: 'Feb', price: 64 },
        { date: 'Mar', price: 65 },
        { date: 'Apr', price: 66 },
        { date: 'May', price: 67 },
      ],
      trend: { trend: [{ date: 'Jun', price: 68 }, { date: 'Jul', price: 69 }, { date: 'Aug', price: 70 }] },
    },
    Sylhet: {
      historical: [
        { date: 'Jan', price: 62 },
        { date: 'Feb', price: 63 },
        { date: 'Mar', price: 64 },
        { date: 'Apr', price: 65 },
        { date: 'May', price: 66 },
      ],
      trend: { trend: [{ date: 'Jun', price: 67 }, { date: 'Jul', price: 68 }, { date: 'Aug', price: 69 }] },
    },
  },
};

function App() {
  const [crop, setCrop] = useState('Rice');
  const [region, setRegion] = useState('Dhaka');
  const [data, setData] = useState({ historical: [], trend: {} });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading delay
    setLoading(true);
    setTimeout(() => {
      setData(mockData[crop][region]);
      setLoading(false);
    }, 500);
  }, [crop, region]);

  const chartData = [...data.historical, ...(data.trend?.trend || [])];

  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans p-8 flex flex-col">
      <div className="max-w-7xl mx-auto flex-grow">
        <header className="mb-10 text-center">
          <h1 className="text-5xl font-bold text-green-400 mb-2">Crop Price Dashboard</h1>
          <p className="text-lg text-gray-400">Local Market Trends & Predictions</p>
        </header>

        {/* Controls */}
        <div className="flex justify-center items-center gap-6 mb-10 p-4 bg-gray-800 rounded-lg shadow-lg">
          <div className="flex items-center gap-3">
            <label htmlFor="crop-select" className="font-semibold text-lg">Crop:</label>
            <select
              id="crop-select"
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              className="bg-gray-700 border-2 border-gray-600 rounded-md p-2 focus:outline-none focus:border-green-400"
            >
              {crops.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-3">
            <label htmlFor="region-select" className="font-semibold text-lg">Region:</label>
            <select
              id="region-select"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="bg-gray-700 border-2 border-gray-600 rounded-md p-2 focus:outline-none focus:border-green-400"
            >
              {regions.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-2xl h-96">
          {loading ? (
            <div className="flex justify-center items-center h-full text-2xl">Loading...</div>
          ) : chartData.length === 0 ? (
            <div className="flex justify-center items-center h-full text-2xl text-yellow-400">No data available.</div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                <XAxis dataKey="date" stroke="#A0AEC0" />
                <YAxis stroke="#A0AEC0" domain={['dataMin - 1', 'dataMax + 1']} />
                <Tooltip contentStyle={{ backgroundColor: '#1A202C', border: '1px solid #4A5568' }} />
                <Legend />
                <Line type="monotone" dataKey="price" data={data.historical} stroke="#48BB78" strokeWidth={3} name="Historical Price" dot={{ r: 4 }} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="price" data={data.trend.trend} stroke="#F56565" strokeWidth={2} strokeDasharray="5 5" name="Predicted Trend" />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center mt-10 text-sm text-gray-500">
        MD. SAYEED IBNE ZAMAN | WhatsApp: +8801685411867 | GitHub:{' '}
        <a href="https://github.com/sayeed21141073" target="_blank" rel="noopener noreferrer" className="text-green-400 underline">
          sayeed21141073
        </a>{' '}
        | LinkedIn:{' '}
        <a href="https://linkedin.com/in/md-sayeed-ibne-zaman" target="_blank" rel="noopener noreferrer" className="text-green-400 underline">
          md-sayeed-ibne-zaman
        </a>
      </footer>
    </div>
  );
}

export default App;

