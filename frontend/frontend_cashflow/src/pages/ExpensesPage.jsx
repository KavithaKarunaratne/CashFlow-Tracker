import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TransactionFilters from '../components/TransactionFilters';
import TransactionList from '../components/TransactionList';
import Pagination from '../components/Pagination';
import NotificationComponent from '../components/Notification';
import EditTransactionModal from '../components/EditTransactionModal';

const PAGE_SIZE = 5;

const filterTransactions = (transactions, { search, selectedTags, type, amountOrder }) => {
  let filtered = transactions;
  if (search) filtered = filtered.filter(txn => txn.description.toLowerCase().includes(search.toLowerCase()));
  if (selectedTags.length)
    filtered = filtered.filter(txn =>
      txn.tags && txn.tags.some(tagObj => selectedTags.includes(tagObj.id))
    );
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

  // NEW: Tags state
  const [tags, setTags] = useState([]);
  const [loadingTags, setLoadingTags] = useState(true);
  const [notification, setNotification] = useState(null);
  const [editingTransaction, setEditingTransaction] = useState(null);

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

  // Fetch tags from backend
  const fetchTags = async () => {
    setLoadingTags(true);
    try {
      const response = await fetch('/api/tags/');
      const data = await response.json();
      setTags(data);
    } catch (error) {
      // handle error (show notification, etc.)
    } finally {
      setLoadingTags(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchTags();
  }, []);

  useEffect(() => {
    if (location.state?.refresh) {
      fetchTransactions();
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const filtered = filterTransactions(transactions, { search, selectedTags, type, amountOrder });
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [search, selectedTags, type, amountOrder]);

  // Delete transaction handler
  const handleDeleteTransaction = async (id) => {
    try {
      const response = await fetch(`/api/transactions/${id}/`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setTransactions((prev) => prev.filter((txn) => txn.id !== id));
        setNotification({ type: 'success', message: 'Transaction deleted successfully!' });
      } else {
        setNotification({ type: 'error', message: 'Failed to delete transaction.' });
      }
    } catch (error) {
      setNotification({ type: 'error', message: 'Error deleting transaction.' });
    }
  };

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
        tags={tags}
        loadingTags={loadingTags}
      />
      <TransactionList 
        transactions={paginated} 
        onTransactionDeleted={(id, error) => {
          // Remove from the full transactions state, not just paginated
          setTransactions(prev => prev.filter(txn => txn.id !== id));
          if (!error) {
            setNotification({ type: 'success', message: 'Transaction deleted successfully!' });
          } else {
            setNotification({ type: 'error', message: error });
          }
        }}
        onEdit={txn => { console.log('Editing transaction:', txn); setEditingTransaction(txn); }}
      />
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      {editingTransaction && (
        <EditTransactionModal
          transaction={editingTransaction}
          tags={tags}
          onClose={() => setEditingTransaction(null)}
          onSave={async (updatedTxn) => {
            const response = await fetch(`/api/transactions/${updatedTxn.id}/`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                type: updatedTxn.type,
                description: updatedTxn.description,
                amount: updatedTxn.amount,
                tag_ids: updatedTxn.tag_ids,
              }),
            });
            if (response.ok) {
              setTransactions(prev => prev.map(txn => txn.id === updatedTxn.id ? { ...txn, ...updatedTxn } : txn));
              setNotification({ type: 'success', message: 'Transaction updated!' });
              setEditingTransaction(null);
            } else {
              setNotification({ type: 'error', message: 'Failed to update transaction.' });
            }
          }}
        />
      )}
      {notification && (
        <NotificationComponent
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default ExpensesPage;