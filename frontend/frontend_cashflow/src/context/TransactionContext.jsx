import React, { createContext, useState, useContext } from "react";

const TransactionContext = createContext();

export function useTransactions() {
  return useContext(TransactionContext);
}

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const fetchTransactions = async () => {
    const response = await fetch("/api/transactions/");
    const data = await response.json();
    setTransactions(data);
    setShouldRefresh(false);
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        setTransactions,
        fetchTransactions,
        shouldRefresh,
        setShouldRefresh,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}