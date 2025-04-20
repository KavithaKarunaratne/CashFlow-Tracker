// src/components/TransactionFilters.jsx

import React from 'react';

const tags = ['Food', 'Transport', 'Entertainment', 'Bills', 'Shopping', 'Health', 'Travel', 'Salary'];

const TransactionFilters = ({
  search,
  setSearch,
  selectedTags,
  setSelectedTags,
  type,
  setType,
  amountOrder,
  setAmountOrder
}) => (
  <div className="mb-4 space-y-2">
    <input
      type="text"
      placeholder="Search transactions..."
      value={search}
      onChange={e => setSearch(e.target.value)}
      className="w-full border rounded px-3 py-2"
    />
    <div className="flex flex-wrap gap-2 items-center">
      <select value={type} onChange={e => setType(e.target.value)} className="border rounded px-2 py-1">
        <option value="">All types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <select value={amountOrder} onChange={e => setAmountOrder(e.target.value)} className="border rounded px-2 py-1">
        <option value="">Amount</option>
        <option value="asc">Lesser</option>
        <option value="desc">Greater</option>
      </select>
      <span className="ml-2 font-semibold">Filter by tags:</span>
      {tags.map(tag => (
        <button
          key={tag}
          onClick={() =>
            setSelectedTags(selectedTags.includes(tag)
              ? selectedTags.filter(t => t !== tag)
              : [...selectedTags, tag])
          }
          className={`px-2 py-1 rounded-full border text-xs ${
            selectedTags.includes(tag)
              ? 'bg-blue-100 border-blue-400 text-blue-700'
              : 'bg-gray-100 border-gray-300 text-gray-500'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  </div>
);

export default TransactionFilters;