import React, { useEffect, useState } from "react";
import SummaryCard from "../components/SummaryCard";
import BalanceCard from "../components/BalanceCard";
import CurrencySelect from "../components/CurrencySelect";
import { useNavigate } from "react-router-dom";


export default function DashBoardPage() {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [balance, setBalance] = useState(0);
  const [currency, setCurrency] = useState("USD");
  const [activeCard, setActiveCard] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSummary() {
      try {
        const res = await fetch("/api/summary/");
        const data = await res.json();
        setIncome(data.total_income || 0);
        setExpenses(data.total_expense || 0);
        setBalance(data.balance || 0);
      } catch (err) {
        setIncome(0);
        setExpenses(0);
        setBalance(0);
      }
    }
    fetchSummary();
  }, []);

  // Currency conversion rates relative to USD
  const currencyRates = {
    USD: 1,
    EUR: 0.8988,
    GBP: 0.752,
    JPY: 141.75,
    CAD: 1.384,
    AUD: 1.565,
    CNY: 7.298,
    INR: 85.373,
    
  };
  const rate = currencyRates[currency] || 1;
  const convertedIncome = income * rate;
  const convertedExpenses = expenses * rate;
  const convertedBalance = balance * rate;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-primary mb-2">SpendWise</h1>
      <p className="text-center text-gray-500 mb-6">Effortlessly track your daily expenses and take control of your financial life</p>
      <BalanceCard balance={convertedBalance} currency={currency} />

      <div className="flex flex-col md:flex-row gap-4 my-6">
        <SummaryCard label="Income" value={convertedIncome} positive currency={currency} />
        <SummaryCard label="Expenses" value={convertedExpenses} negative currency={currency} />
        
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {[{label: 'Add Transaction', route: '/add'}, {label: 'View Transactions', route: '/expenses'}].map((card, idx) => (
          <button
            key={card.label}
            className={`flex-1 rounded-lg shadow p-4 text-base font-semibold transition-all duration-150 focus:outline-none 
              ${activeCard === idx ? 'bg-blue-600 text-white' : 'bg-white text-blue-700 hover:bg-blue-100'}
            `}
            style={{ minHeight: '72px' }}
            onClick={() => {
              setActiveCard(idx);
              setTimeout(() => navigate(card.route), 120); // short delay for visual feedback
            }}
          >
            {card.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg p-4 shadow">
        <div className="font-semibold mb-2">Currency Settings</div>
        <CurrencySelect value={currency} onChange={setCurrency} />
      </div>
    </div>
  );
}

