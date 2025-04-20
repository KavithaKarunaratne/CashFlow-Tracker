import React, { useState } from 'react';
import TransactionCard from './Transactioncard';
import TagChip from './TagChip';

const TransactionList = ({ transactions, onTransactionDeleted, onEdit }) => {
  const [expandedId, setExpandedId] = useState(null);

  const handleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Delete transaction from backend
  const handleDelete = async (txn) => {
    try {
      const response = await fetch(`/api/transactions/${txn.id}/`, { method: 'DELETE' });
      if (response.ok) {
        if (onTransactionDeleted) onTransactionDeleted(txn.id);
      } else {
        if (onTransactionDeleted) onTransactionDeleted(txn.id, 'Failed to delete transaction.');
      }
    } catch (e) {
      if (onTransactionDeleted) onTransactionDeleted(txn.id, 'Error deleting transaction.');
    }
  };


  return (
    <div>
      {transactions.map(txn => (
        <div key={txn.id} className="mb-2">
          {/* Clickable card */}
          <TransactionCard
            title={txn.title}
            description={txn.description}
            date={txn.date}
            amount={txn.amount}
            isIncome={txn.type ? txn.type === 'income' : txn.amount > 0}
            expanded={expandedId === txn.id}
            tags={txn.tags}
            onEdit={() => { if (typeof onEdit === 'function') onEdit(txn); }}
            onDelete={e => { e.stopPropagation(); handleDelete(txn); }}
            // Make the whole card clickable except for action buttons
            onClick={() => handleExpand(txn.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default TransactionList;