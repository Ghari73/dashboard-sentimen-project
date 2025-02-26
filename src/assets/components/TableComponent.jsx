import React, { useState, useMemo, useEffect } from "react";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { fetchAllReview } from "../../api/restApi";


const TableComponent = () => {
  const [data, setData] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const pageSize = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchAllReview();
        
        // Konversi data agar cocok dengan tabel
        const formattedData = result.map(item => ({
          id: item.reviewId,
          comment: item.content,
          rating: item.score,
          date: new Date(item.at).toLocaleDateString(), // Format tanggal
          relevance: item.thumbsUpCount,
          sentiment: item.sentiment,
          appVersion: item.appVersion || "N/A", // Jika null, ganti dengan "N/A"
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  
  useEffect(() => {
    setCurrentPage(1);
  }, [searchText]);

  const sortedData = useMemo(() => {
    let sortableData = [...data];
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const filteredData = useMemo(() => {
    return sortedData.filter(row => row.comment.toLowerCase().includes(searchText.toLowerCase()));
  }, [searchText, sortedData]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredData]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const currentData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="">
      <div className="flex justify-end items-center mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 rounded w-1/3"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 rounded-lg shadow-lg">
          <thead className="bg-gray-200">
            <tr>
              {['Review Id', 'Comment', 'Rating', 'Date', 'Relevance', 'Sentiment', 'App Version'].map(col => (
                <th 
                  key={col} 
                  className="p-3 border cursor-pointer"
                  onClick={() => handleSort(col.toLowerCase().replace(/ /g, ""))}
                >
                  {col} {sortConfig.key === col.toLowerCase().replace(/ /g, "") ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map(row => (
                <tr key={row.id} className="border-b hover:bg-gray-100">
                  <td className="p-3 border">{row.id}</td>
                  <td className="p-3 border">{row.comment}</td>
                  <td className="p-3 border text-center">{row.rating}</td>
                  <td className="p-3 border text-center">{row.date}</td>
                  <td className="p-3 border text-center">{row.relevance}</td>
                  <td className="p-3 border text-center">{row.sentiment}</td>
                  <td className="p-3 border text-center">{row.appVersion}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-3">No data found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
          className={`px-5 py-3 bg-gray-300 flex items-center rounded-xl ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={currentPage === 1}
        >
          <div className="mr-2"><GrLinkPrevious /></div> Previous
        </button>
        <span> {currentPage} of {totalPages} </span>
        <button
          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
          className={`px-5 py-3 bg-[#1BB8B3] flex items-center text-white rounded-xl ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={currentPage === totalPages}
        >
          Next <div className="ml-2"><GrLinkNext /></div>
        </button>
      </div>
    </div>
  );
};

export default TableComponent;
