// src/components/Transactioncard.jsx

import React from 'react';

const TransactionCard = ({ title, date, amount, isIncome }) => (
  <div className="flex justify-between items-center bg-white rounded-lg shadow p-4 mb-2">
    <div>
      <div className="font-medium">{title}</div>
      <div className="text-gray-400 text-sm">{date}</div>
    </div>
    <div className={`font-semibold ${isIncome ? 'text-green-500' : 'text-red-500'}`}>
      {isIncome ? '+' : '-'}CA${Math.abs(amount).toFixed(2)}
    </div>
  </div>
);

export default TransactionCard;