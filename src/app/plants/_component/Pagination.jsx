"use client";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-green-600 text-white rounded-lg shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed transition"
      >
        Prev
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-lg shadow-md transition ${
            page === currentPage
              ? "bg-green-700 text-white"
              : "bg-white text-green-600 border border-green-600"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-green-600 text-white rounded-lg shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed transition"
      >
        Next
      </button>
    </div>
  );
}
