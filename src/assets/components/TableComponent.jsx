// src/assets/components/TableComponent.jsx
import '../styles/TableComponent.css'; // Import CSS file
import React, { useState, useEffect } from 'react';
import { fetchPriorityReviews } from '../../api/restApi';
import {Search, ArrowLeft, ArrowRight} from 'lucide-react';

const TableComponent = ({ from, to }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');
  const pageSize = 10;
  const [hasNextPage, setHasNextPage] = useState(true);
  const [totalPages, setTotalPages] = useState();
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("⏳ Fetching data for page:", page, "keyword:", searchKeyword, "from:", from, "to:", to);

        const offset = (page - 1) * pageSize;
        const data = await fetchPriorityReviews(offset, searchKeyword, from, to);

        setHasNextPage(data.currentPage !== data.totalPages);
        setReviews(data.data);
        setTotalPages(data.totalPages);
        setTotalItems(data.totalItems);
      } catch (error) {
        console.error("❌ Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, searchKeyword, from, to]); 

// Hitung total halaman
// const totalPages = Math.ceil(totalItems / pageSize);

// Kondisi tombol
const isNextDisabled = page >= totalPages;
const isPrevDisabled = page <= 1;

const handleNext = () => {
  console.log("⏭️ Next button clicked");
  setPage(prev => prev + 1);
};

const handlePrev = () => {
  console.log("⏮️ Previous button clicked");
  setPage(prev => Math.max(prev - 1, 1));
};

const handleSearch = (e) => {
  console.log("🔍 Search keyword changed:", e.target.value);
  setSearchKeyword(e.target.value);
  setPage(1); // Reset ke halaman 1 saat search
};

  return (
    <div className="p-6">
      {/* Search Bar */}
      <div className="flex justify-end mb-4">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search..."
            value={searchKeyword}
            onChange={handleSearch}
            className="border border-gray-300 rounded-lg py-2 pl-4 pr-10 w-full focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />

        </div>
      </div>

      {/* Loading State */}
      {loading && <div className="text-center text-gray-600">Loading...</div>}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200 text-gray-700">
            <tr className="text-center">
              <th className="p-3 border border-gray-300">Review Id</th>
              <th className="p-3 border border-gray-300">Comment</th>
              <th className="p-3 border border-gray-300">Rating</th>
              <th className="p-3 border border-gray-300 w-28">Date</th>
              <th className="p-3 border border-gray-300">Relevance</th>
              <th className="p-3 border border-gray-300">Sentiment</th>
              <th className="p-3 border border-gray-300">App Version</th>
            </tr>
          </thead>
          <tbody>
            {reviews?.length > 0 ? (
              reviews.map((review) => (
                <tr key={review.reviewId} className="text-center bg-white hover:bg-gray-100">
                  <td className="p-3 border border-gray-300">{review.reviewId}</td>
                  <td className="p-3 border border-gray-300 text-left">{review.content}</td>
                  <td className="p-3 border border-gray-300">{review.score}</td>
                  <td className="p-3 border border-gray-300">{new Date(review.at).toISOString().split("T")[0]}</td>
                  <td className="p-3 border border-gray-300">{review.thumbsUpCount || "-"}</td>
                  <td className="p-3 border border-gray-300">
                    {review.sentiment === "1" ? "positive" : "negative"}
                  </td>
                  <td className="p-3 border border-gray-300">{review.appVersion}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-3 text-center border border-gray-300">
                  No Data Available
                </td>
              </tr>
            )}
          </tbody>
          
        </table>
      </div>

      {/* Pagination */}

      <div className="flex items-center justify-between mt-4">
        {/* Tombol Previous */}
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className={`w-[120px] h-[50px] px-4 py-2 rounded-lg text-white text-center flex items-center justify-center gap-2 
            ${page === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700"}`}
        >
          <ArrowLeft size={18} />
          Previous
        </button>

        {/* Info Halaman */}
        <span className="text-gray-700">Page {page} of {totalPages}</span>

        {/* Tombol Next */}
        <button
          onClick={handleNext}
          disabled={!hasNextPage}
          className={`w-[120px] h-[50px] px-4 py-2 rounded-lg text-white text-center flex items-center justify-center gap-2 
            ${!hasNextPage ? "bg-gray-400 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700"}`}
        >
          Next
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default TableComponent;