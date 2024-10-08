import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = [];
  
  // Generate an array of page numbers based on totalPages
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      {/* Previous button: moves to the previous page, disabled if on the first page */}
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {/* Render the page numbers */}
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={currentPage === number ? "active" : ""} // Highlight the active page
        >
          {number}
        </button>
      ))}

      {/* Next button: moves to the next page, disabled if on the last page */}
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
