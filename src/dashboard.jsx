import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LineChart from "./assets/chart/LineChart"; // Import komponen chart
import BarChart from "./assets/chart/BarChart"; // Import komponen BarChart
import TimeSeriesChart from "./assets/chart/TimeSeriesChart";
import PieChart from "./assets/chart/PieChart";


import { useState } from 'react';

const Dashboard = () => {
  const [filterVersion, setFilterVersion] = useState('All Versions');
  
  // Data dummy untuk contoh
  const overviewData = [
    { title: 'Latest Date', value: '24 May 2024' },
    { title: 'Juniah review', value: '4.8/5' },
    { title: 'App score', value: '4.6/5' },
    { title: 'Downloads', value: '1.2M' },
  ];

  const comments = [
    { user: 'User1', comment: 'Aplikasi sangat membantu dalam...', rating: 3 },
    { user: 'User2', comment: 'Update terbaru membuat kinerja...', rating: 5 },
    // ...data lainnya
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Ulasan Byond</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {overviewData.map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500">{item.title}</h3>
            <p className="text-2xl font-semibold text-gray-800 mt-2">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="border-b border-gray-200 my-6"></div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Line Chart Placeholder */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Sentiment frekuensi over time</h2>
          {/* <div className="h-64 bg-gray-100 rounded animate-pulse"></div> */}
          <TimeSeriesChart />
        </div>

        {/* Filter and Bars */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filter Version</h2>
              <select 
                className="border rounded-md px-3 py-1 text-sm"
                value={filterVersion}
                onChange={(e) => setFilterVersion(e.target.value)}
              >
                <option>All Versions</option>
                <option>v1.0</option>
                <option>v2.0</option>
              </select>
            </div>
            <BarChart />
          </div>

          {/* Pie Chart Placeholder */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Distribusi sentiment</h2>
            {/* <div className="h-48 bg-gray-100 rounded-full animate-pulse"></div> */}
            <PieChart />
          </div>
        </div>
      </div>

      {/* Wordcloud Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Wordcloud Negatif</h2>
\
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Wordcloud Positif</h2>
\
        </div>
      </div>

      {/* Comments Table */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Tabel Komentar Prioritas</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm border-b">
                <th className="pb-3">User</th>
                <th className="pb-3">Komentar</th>
                <th className="pb-3">Rating</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment, index) => (
                <tr key={index} className="border-b last:border-b-0">
                  <td className="py-3 text-sm">{comment.user}</td>
                  <td className="py-3 text-sm max-w-xs">{comment.comment}</td>
                  <td className="py-3">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                      {comment.rating}/5
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;