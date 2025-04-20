import React from 'react';
import TagChip from './TagChip';

const TransactionFilters = ({
  search,
  setSearch,
  selectedTags,
  setSelectedTags,
  type,
  setType,
  amountOrder,
  setAmountOrder,
  tags = [],
  loadingTags = false,
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
      {loadingTags ? (
        <span>Loading tags...</span>
      ) : (
        tags.map(tag => (
            <TagChip
              key={tag.id}
              label={tag.name}
              color={tag.color}
              selected={selectedTags.includes(tag.id)}
              onClick={() =>
                setSelectedTags(selectedTags.includes(tag.id)
                  ? selectedTags.filter(t => t !== tag.id)
                  : [...selectedTags, tag.id])
              }
              className="cursor-pointer"
            />
          ))
      )}
    </div>
  </div>
);

export default TransactionFilters;