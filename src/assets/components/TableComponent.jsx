import React, { useState, useMemo, useEffect } from "react";

const TableComponent = ({ data }) => {
  const [searchText, setSearchText] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Jumlah data per halaman

  // 🔄 Reset page ke 1 saat searchText atau dateFilter berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, dateFilter]);

  // **🔍 Search & Filter Data**
  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const matchesSearch = searchText
        ? row.username.toLowerCase().includes(searchText.toLowerCase()) ||
          row.comment.toLowerCase().includes(searchText.toLowerCase())
        : true;

      const matchesDate = dateFilter ? row.date.startsWith(dateFilter) : true;

      return matchesSearch && matchesDate;
    });
  }, [data, searchText, dateFilter]);

  // **🔀 Sorting Data**
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    return [...filteredData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  // **📃 Pagination**
  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize)); // Minimal 1 halaman
  const currentData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage]);

  // **🔀 Handle Sorting**
  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* 🔎 Search & Filter */}
      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search username or comment..."
          className="border p-2 rounded w-1/2"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 rounded w-1/2"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </div>

      {/* 🏆 Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 rounded-lg shadow-lg">
          <thead className="bg-blue-500 text-white">
            <tr>
              {["Date", "Username", "Score", "Thumbs Up", "App Version", "Comment"].map((col, index) => (
                <th
                  key={index}
                  className="p-3 cursor-pointer"
                  onClick={() => handleSort(col.toLowerCase().replace(/\s+/g, ""))}
                >
                  {col} {sortConfig.key === col.toLowerCase().replace(/\s+/g, "") ? (sortConfig.direction === "asc" ? "🔼" : "🔽") : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((row) => (
                <tr key={row.id} className="border-b hover:bg-gray-100">
                  <td className="p-3">{row.date}</td>
                  <td className="p-3 font-medium">{row.username}</td>
                  <td className="p-3 text-center">{row.score}</td>
                  <td className="p-3 text-center">{row.thumbsup}</td>
                  <td className="p-3 text-center">{row.appVersion}</td>
                  <td className="p-3">{row.comment}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-3">No data found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 📃 Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          className={`px-4 py-2 bg-blue-500 text-white rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          className={`px-4 py-2 bg-blue-500 text-white rounded ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TableComponent;
