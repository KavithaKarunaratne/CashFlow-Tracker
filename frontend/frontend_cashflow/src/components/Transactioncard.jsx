// src/components/Transactioncard.jsx

import React from 'react';
import TagChip from './TagChip';

const TransactionCard = ({
  title,
  description,
  date,
  amount,
  isIncome,
  expanded,
  tags,
  onEdit,
  onDelete,
  onClick,
}) => (
  <div
    className={`bg-white rounded-lg shadow mb-2 transition-all duration-200 ${expanded ? 'pb-4' : ''}`}
    onClick={onClick}
    style={{ userSelect: 'none' }}
  >
    <div className="flex justify-between items-center p-4 cursor-pointer">
      <div>
        <div className="font-medium">{title}</div>
        {/* Description below the title, styled subtly */}
        {description && (
          <div className="text-black text-base font-semibold">{description}</div>
        )}
        <div className="text-gray-400 text-xs">{date}</div>
      </div>
      <div className={`font-semibold ${isIncome ? 'text-green-500' : 'text-red-500'}`}>{isIncome ? '+' : '-'}${Math.abs(amount).toFixed(2)}</div>
    </div>
    {expanded && (
      <div className="px-4 mt-2">
        {/* Debug: log tags */}
        {console.log('TransactionCard tags:', tags)}
        {/* Tags */}
        <div className="flex gap-2 flex-wrap mb-2">
          {(tags || []).map(tag => (
            <TagChip
              key={tag.id || tag.name || Math.random()}
              label={tag.name || 'Unnamed'}
              color={tag.color || '#60A5FA'}
              selected
              className="cursor-default"
            />
          ))}
        </div>
        {/* Actions */}
        <div className="flex gap-2 justify-end">
          <button 
            className="font-semibold text-blue-600 hover:underline focus:outline-none" 
            onClick={e => { e.stopPropagation(); onEdit && onEdit(); }}
          >
            Edit
          </button>
          <button 
            className="font-semibold text-red-600 hover:underline focus:outline-none" 
            onClick={e => { e.stopPropagation(); onDelete && onDelete(e); }}
          >
            Delete
          </button>
        </div>
      </div>
    )}
  </div>
);

export default TransactionCard;