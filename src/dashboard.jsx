//Font
import "@fontsource/roboto"; // Impor font untuk semua style
import "@fontsource/roboto/300.css"; // Light
import "@fontsource/roboto/400.css"; // Regular
import "@fontsource/roboto/500.css"; // Medium
import "@fontsource/roboto/700.css"; // Bold
import { RxExit } from "react-icons/rx";
import { MdFileDownload } from "react-icons/md";
import { MdStar } from "react-icons/md";
import { RiDatabaseFill } from "react-icons/ri";
import { IoCalendarClear } from "react-icons/io5";

import { useAuth } from "./AuthContext";
import {AuthProvider} from "./AuthContext";

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

import { useState, useMemo, useEffect } from 'react';
import { fetchAppDetail, fetchLatestDate } from "./api/restApi";

const Dashboard = () => {
  const [filterVersion, setFilterVersion] = useState('All Versions');
  const {logout2} = useAuth();
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

  const [appDetail, setAppDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [latestDate, setLatestDate] = useState(null);
  const [loadingLD, setLoadingLD] = useState(true);
  const [errorLD, setErrorLD] = useState(null);

  useEffect(() => {
    const getAppDetail = async () => {
        try {
            const data = await fetchAppDetail();
            setAppDetail(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const getLatestDate = async () => {
      try {
          const data = await fetchLatestDate();
          setLatestDate(data);
      } catch (error) {
          setLatestDate(error.message);
      } finally {
          setLoadingLD(false);
      }
  };


    getAppDetail();
    getLatestDate();
}, []);

  return (
    <AuthProvider>
      <div style={{ fontFamily: "'Roboto', sans-serif" }} className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className='flex justify-between px-20 py-4 bg-[#F5FFFF] drop-shadow-lg mb-8'>
          <div className="flex items-center">
            <img className='mr-7' src={logo} alt="" />
            <h1 className="text-4xl font-bold text-[#0E8783]">BYOND Sentiment Dashboard</h1>        
          </div>
          <div className="flex items-center">
            <a href="">
              <RxExit onClick= {() => logout2()} size={30} width={30} color="#0E8783" style={{ strokeWidth: 0.8 }}></RxExit>

            </a>
          </div>
        </div>

        <div className='px-20'>
        {/* Overview Cards */}
        <div>
          <div className='flex justify-between mb-8'>
            <div>
              <h2 className="text-3xl text-[#444444] font-bold">Overview</h2>
            </div>
            <div>
              {/* <button className='bg-[#1BB8B3] text-white text-base font-semibold py-3.5 px-7 rounded-xl'>Export Dashboard</button> */}
            </div>
          </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 flex items-center rounded-lg shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-[#0E8783] rounded-2xl p-2.5 mr-6 ">
                <IoCalendarClear size={40} color="white"  />
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-500">Latest Date</h3>
                {loadingLD ? (
                        <p className="text-4xl font-semibold text-gray-800 mt-2">Loading...</p>
                    ) : errorLD ? (
                        <p className="text-red-500 text-lg">Error</p>
                    ) : (
                      <p className="text-4xl font-semibold text-gray-800 mt-2">
                        {latestDate ? latestDate.date : "No Data"}
                    </p>
                )}
              </div>
            </div>
            <div className="bg-white p-4 flex items-center rounded-lg shadow-sm border border-gray-100">
                <div className="w-16 h-16 bg-[#1BB8B3] rounded-2xl p-1.5 mr-6">
                    <RiDatabaseFill size={50} color="white" />
                </div>
                <div>
                    <h3 className="text-xl font-medium text-gray-500">Reviews Count</h3>
                    {loading ? (
                        <p className="text-4xl font-semibold text-gray-800 mt-2">Loading...</p>
                    ) : error ? (
                        <p className="text-red-500 text-lg">Error</p>
                    ) : (
                        <p className="text-4xl font-semibold text-gray-800 mt-2">
                            {appDetail ? appDetail["Number of Reviews"].toLocaleString() : "No Data"}
                        </p>
                    )}
                </div>
            </div>
            {/* APP SCORE */}
            <div className="bg-white p-4 flex items-center rounded-lg shadow-sm border border-gray-100">
                <div className="w-16 h-16 bg-[#1BB8B3] rounded-2xl p-1.5 mr-6">
                    <MdStar size={50} color="white" />
                </div>
                <div>
                    <h3 className="text-xl font-medium text-gray-500">App Score</h3>
                    {loading ? (
                        <p className="text-4xl font-semibold text-gray-800 mt-2">Loading...</p>
                    ) : error ? (
                        <p className="text-red-500 text-lg">Error</p>
                    ) : (
                        <p className="text-4xl font-semibold text-gray-800 mt-2">
                            {appDetail ? appDetail["App Score"].toFixed(2) : "No Data"}
                        </p>
                    )}
                </div>
            </div>
            <div className="bg-white p-4 flex items-center rounded-lg shadow-sm border border-gray-100">
                <div className="w-16 h-16 bg-[#DD9838] rounded-2xl p-1.5 mr-6">
                    <MdFileDownload size={50} color="white" />
                </div>
                <div>
                    <h3 className="text-xl font-medium text-gray-500">Downloads</h3>
                    {loading ? (
                        <p className="text-4xl font-semibold text-gray-800 mt-2">Loading...</p>
                    ) : error ? (
                        <p className="text-red-500 text-lg">Error</p>
                    ) : (
                        <p className="text-4xl font-semibold text-gray-800 mt-2">
                            {appDetail ? appDetail["App Downloads"] : "No Data"}
                        </p>
                    )}
                </div>
        </div>
        </div>
        </div>

        <div className="border-b border-[#717171] my-6"></div>
        <div className="flex justify-end items-center mb-4">
          {/* <button className="bg-[#1BB8B3] text-white text-base font-semibold py-3.5 px-7 rounded-xl">Hallo</button> */}
          <FilterDropdown className="w-auto" versions={versions} onApplyFilters={handleApplyFilters} />

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
        <div className="bg-white py-11 px-36 rounded-lg shadow-sm">
          <h2 className="text-4xl text-[#888888] font-bold mb-4">Highlighted Comment</h2>
          <div className="overflow-x-auto">
            <TableComponent data={sampleData} />
          </div>
        </div>
        </div>
      </div>
    </AuthProvider>
  );
};

export default Dashboard;