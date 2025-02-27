// src/assets/components/TableComponent.jsx
import '../styles/TableComponent.css'; // Import CSS file
import React, { useState, useEffect } from 'react';
import { fetchPriorityReviews } from '../../api/restApi';

const TableComponent = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');
  const pageSize = 10;
  const [hasNextPage, setHasNextPage] = useState(true); // State baru

  // Tambahkan state totalItems
const [totalItems, setTotalItems] = useState(0);

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      console.log("⏳ Mulai fetch data untuk page:", page, "keyword:", searchKeyword);
      
      const offset = (page - 1) * pageSize;
      const data = await fetchPriorityReviews(offset, searchKeyword);
      
      // Cek apakah data yang diterima kurang dari pageSize (artinya sudah halaman terakhir)
      setHasNextPage(data.length === pageSize);
      setReviews(data);
    } catch (error) {
      console.error("❌ Error:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [page, searchKeyword]);

// Hitung total halaman
const totalPages = Math.ceil(totalItems / pageSize);

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
  
  useEffect(() => {
      const fetchData = async () => {
          try {
              setLoading(true);
              const offset = (page - 1) * pageSize;
              const data = await fetchPriorityReviews(offset, searchKeyword);
              setReviews(data);

              // Hitung total pages berdasarkan jumlah data yang diterima
              if (data.length < pageSize) {
                  setTotalPages(page);
              }
          } catch (error) {
              console.error("Error fetching reviews:", error);
          } finally {
              setLoading(false);
          }
      };

      fetchData();
  }, [page, searchKeyword]);

  return (
      <div>
          {/* Search Bar */}
          <div className="search-container">
  <input
    type="text"
    placeholder="Search..."
    value={searchKeyword}
    onChange={handleSearch}
    className="search-input"
  />
  <div className="search-icon">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0z"/>
    </svg>
  </div>
</div>

          {/* Loading State */}
          {loading && <div>Loading...</div>}

          {/* Table */}
          <table className="review-table">
              <thead>
                  <tr>
                      <th>Review Id</th>
                      <th>Comment</th>
                      <th>Rating</th>
                      <th>Date</th>
                      <th>Relevance</th>
                      <th>Sentiment</th>
                      <th>App Version</th>
                  </tr>
              </thead>
              <tbody>
                  {reviews.map(review => (
                      <tr key={review.reviewId}>
                          <td>{review.reviewId}</td>
                          <td>{review.content}</td>
                          <td>{review.score}</td>
                          <td>{new Date(review.at).toLocaleDateString()}</td>
                          <td>{review.thumbsUpCount}</td>
                          <td>{review.sentiment === "1" ? "positive" : "negative"}</td>
                          <td>{review.appVersion}</td>
                      </tr>
                  ))}
              </tbody>
          </table>

          {/* Pagination */}
      <div className="pagination">
        <button 
          onClick={handlePrev}
          disabled={page === 1}
          className="pagination-button"
          style={{ backgroundColor: page === 1 ? '#cccccc' : '#0E8783' }}
        >
          Previous
        </button>
        <span className="page-info">Page {page}</span>
        <button 
          onClick={handleNext}
          disabled={!hasNextPage}
          className="pagination-button"
          style={{ backgroundColor: !hasNextPage ? '#cccccc' : '#0E8783' }}
        >
          Next
        </button>
      </div>
      </div>
  );
};

export default TableComponent;