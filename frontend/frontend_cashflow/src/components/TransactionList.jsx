// src/components/TransactionList.jsx

import React from 'react';
import TransactionCard from './Transactioncard';

const TransactionList = ({ transactions }) => (
  <div>
    {transactions.map(txn => (
      <TransactionCard
        key={txn.id}
        title={txn.title}
        date={txn.date}
        amount={txn.amount}
        isIncome={txn.amount > 0}
      />
    ))}
  </div>
);

export default TransactionList;