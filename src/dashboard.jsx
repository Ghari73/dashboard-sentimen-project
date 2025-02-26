//Font
import "@fontsource/roboto"; // Impor font untuk semua style
import "@fontsource/roboto/300.css"; // Light
import "@fontsource/roboto/400.css"; // Regular
import "@fontsource/roboto/500.css"; // Medium
import "@fontsource/roboto/700.css"; // Bold

import './App.css'

import BarChart from "./assets/components/BarChart"; // Import komponen BarChart
import { barChartData } from './assets/data/barChartData'; // Sesuaikan path

import FilterDropdown from './assets/components/FilterDropdown'; // Sesuaikan path

import TimeSeriesChart from "./assets/components/TimeSeriesChart";
import PieChart from "./assets/components/PieChart";
import TableComponent from './assets/components/TableComponent';

// gambar
import logo from './assets/images/logo.png'; // Sesuaikan path

//WordCloud
import WordCloud from './assets/components/WordCloud'; // Sesuaikan path
import wordData from './assets/data/wordData';

import { useState, useMemo } from 'react';

const Dashboard = () => {
  const [filterVersion, setFilterVersion] = useState('All Versions');

  const [versions, setVersions] = useState([
    'Version 1.0.1',
    'Version 1.0.2',
    'Version 1.0.3',
    'Version 1.0.4',
    'Version 2.0.1',
  ]);

  const [filters, setFilters] = useState({});

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    console.log('Applied Filters:', newFilters);
  };
  
  // Data dummy untuk contoh
  const overviewData = [
    { title: 'Latest Date', value: '24 May 2024' },
    { title: 'Reviews Count', value: '32421' },
    { title: 'App score', value: '4.6' },
    { title: 'Downloads', value: '1.000.000+' },
  ];

  const options = {
    color: "#222", // Warna default
    randomColor: true, // Warna acak aktif
    fontFamily: "Poppins, sans-serif",
    scale: 2,
    rotate: 30,
  };

  const comments = [
    { user: 'User1', comment: 'Aplikasi sangat membantu dalam...', rating: 3 },
    { user: 'User2', comment: 'Update terbaru membuat kinerja...', rating: 5 },
    // ...data lainnya
  ];

  const sampleData = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    date: `2024-02-${(i % 28 + 1).toString().padStart(2, "0")}`, // Format YYYY-MM-DD
    username: `User${i + 1}`,
    score: Math.floor(Math.random() * 100), // Random Score
    thumbsup: Math.floor(Math.random() * 50), // Random Thumbs Up
    appVersion: `v${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}`,
    comment: `This is comment number ${i + 1}`,
  }));

  return (
    <div style={{ fontFamily: "'Roboto', sans-serif" }} className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className='flex items-center px-20 py-4 bg-[#F5FFFF] drop-shadow-lg mb-8'>
        <img className='mr-7' src={logo} alt="" />
        <h1 className="text-4xl font-bold text-[#0E8783]">BYOND Sentiment Dashboard</h1>        
      </div>

      <div className='px-20'>
      {/* Overview Cards */}
      <div>
        <div className='flex justify-between mb-8'>
          <div>
            <h2 className="text-3xl text-[#444444] font-bold">Overview</h2>
          </div>
          <div>
            <button className='bg-[#1BB8B3] text-white text-base font-semibold py-3.5 px-7 rounded-xl'>Export Dashboard</button>
          </div>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {overviewData.map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-xl font-medium text-gray-500">{item.title}</h3>
            <p className="text-4xl font-semibold text-gray-800 mt-2">{item.value}</p>
          </div>
        ))}
      </div>
      </div>

      <div className="border-b border-[#717171] my-6"></div>
      <div className="flex justify-between items-center mb-4">
              <FilterDropdown versions={versions} onApplyFilters={handleApplyFilters} />
            </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Line Chart Placeholder */}
        <div className="bg-white p-6 rounded-lg col-span-2 shadow-sm">
          <h2 className="text-3xl font-bold mb-4 text-[#13A09B]">Sentiment Over Time</h2>
          {/* <div className="h-64 bg-gray-100 rounded animate-pulse"></div> */}
          <TimeSeriesChart/>
        </div>

        {/* Filter and Bars */}
        <div className="space-y-6">
          {/* <div className="bg-white p-6 rounded-lg shadow-sm rid "> */}

          <BarChart data={barChartData} />
          {/* </div> */}

          {/* Pie Chart Placeholder */}
          {/* <div className="bg-white p-6 rounded-lg shadow-sm"> */}
            {/* <h2 className="text-lg font-semibold mb-4">Distribusi sentiment</h2> */}
            {/* <div className="h-48 bg-gray-100 rounded-full animate-pulse"></div> */}
            <PieChart />
          {/* </div> */}
        </div>
      </div>

      {/* Wordcloud Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className='flex'>
            <h2 className="text-4xl text-[#DD9838] font-medium mb-4 mr-2">Negative</h2>
            <h2 className="text-4xl text-[#666666] font-medium mb-4">Wordcloud</h2>      
          </div>
          <WordCloud
          words={wordData.negative}
          options={{
            color: "orange",
            fontFamily: "Arial",
            scale: 1.8,
            rotate: () => (Math.random() > 0.5 ? 0 : 90),
            randomColor: false,
          }}
        />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className='flex'>
            <h2 className="text-4xl text-[#14AE5C] font-medium mb-4 mr-2">Positive</h2>
            <h2 className="text-4xl text-[#666666] font-medium mb-4">Wordcloud</h2>      
          </div>
          <WordCloud
          words={wordData.positive}
          options={{
            color: "teal",
            fontFamily: "Arial",
            scale: 1.8,
            rotate: () => (Math.random() > 0.5 ? 0 : 90),
            randomColor: false,
          }}
        />
        </div>
      </div>

      {/* Comments Table */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Tabel Komentar Prioritas</h2>
        <div className="overflow-x-auto">
          <TableComponent data={sampleData} />
        </div>
      </div>
      </div>
    </div>
  );
};

export default Dashboard;