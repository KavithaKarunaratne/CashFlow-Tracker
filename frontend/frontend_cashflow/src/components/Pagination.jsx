// src/components/Pagination.jsx
export default function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;
  
    // Generate page numbers (simple version, you can enhance for ellipsis)
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  
    return (
      <nav className="flex items-center justify-center gap-2 mt-4">
        <button
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          &lt;
        </button>
        {pages.map((page) => (
          <button
            key={page}
            className={`px-3 py-1 rounded ${page === currentPage ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        ))}
        <button
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          &gt;
        </button>
      </nav>
    );
  }