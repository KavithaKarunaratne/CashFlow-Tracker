// src/components/BalanceCard.jsx

import React from "react";

export default function BalanceCard({ balance, currency }) {
  return (
    <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl shadow p-8 mb-6 text-center">
      <div className="text-white text-lg font-semibold mb-2">Your Balance</div>
      <div className={`text-3xl font-bold ${balance >= 0 ? "text-green-200" : "text-red-200"}`}>
        {balance >= 0 ? "+" : "-"}
        {currency}
        {Math.abs(balance).toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </div>
    </div>
  );
}