import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TransactionFilters from '../components/TransactionFilters';
import TransactionList from '../components/TransactionList';
import Pagination from '../components/Pagination';

const PAGE_SIZE = 5;

const filterTransactions = (transactions, { search, selectedTags, type, amountOrder }) => {
  let filtered = transactions;
  if (search) filtered = filtered.filter(txn => txn.description.toLowerCase().includes(search.toLowerCase()));
  if (selectedTags.length)
    filtered = filtered.filter(txn => selectedTags.some(tag => txn.tags?.includes(tag)));
  if (type) filtered = filtered.filter(txn => (type === 'income' ? txn.amount > 0 : txn.amount < 0));
  if (amountOrder)
    filtered = filtered.sort((a, b) => amountOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount);
  return filtered;
};

const ExpensesPage = () => {
  const location = useLocation();

  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [type, setType] = useState('');
  const [amountOrder, setAmountOrder] = useState('');
  const [page, setPage] = useState(1);

  // Fetch transactions from backend
  const fetchTransactions = async () => {
    try {
      const response = await fetch('/api/transactions/');
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      // handle error (show notification, etc.)
    }
  };

  // Fetch on mount
  useEffect(() => {
    fetchTransactions();
  }, []);

  // Refetch if navigated with refresh flag
  useEffect(() => {
    if (location.state?.refresh) {
      fetchTransactions();
      window.history.replaceState({}, document.title); // Clear refresh flag
    }
    // eslint-disable-next-line
  }, [location.state]);

  // Filtered and paginated transactions
  const filtered = filterTransactions(transactions, { search, selectedTags, type, amountOrder });
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    setPage(1); // Reset to page 1 when filters change
  }, [search, selectedTags, type, amountOrder]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Transactions</h2>
      <TransactionFilters
        search={search}
        setSearch={setSearch}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        type={type}
        setType={setType}
        amountOrder={amountOrder}
        setAmountOrder={setAmountOrder}
      />
      <TransactionList transactions={paginated} />
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
};

export default ExpensesPage;