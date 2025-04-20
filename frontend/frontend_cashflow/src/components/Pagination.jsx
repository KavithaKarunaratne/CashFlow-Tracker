// src/components/Pagination.jsx

import React from 'react';

const Pagination = ({ page, totalPages, setPage }) => (
  <div className="flex justify-center items-center mt-4 gap-2">
    <button
      className="px-3 py-1 rounded border disabled:opacity-50"
      onClick={() => setPage(page - 1)}
      disabled={page === 1}
    >
      Previous
    </button>
    <span className="px-2">{page}</span>
    <button
      className="px-3 py-1 rounded border disabled:opacity-50"
      onClick={() => setPage(page + 1)}
      disabled={page === totalPages}
    >
      Next
    </button>
  </div>
);

export default Pagination;