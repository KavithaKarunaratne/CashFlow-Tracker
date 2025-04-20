export default function CurrencySelect({ value, onChange }) {
    return (
      <select
        className="border rounded px-3 py-2 w-full"
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        <option value="USD">USD - US Dollar ($)</option>
        <option value="EUR">EUR - Euro (€)</option>
        <option value="GBP">GBP - British Pound (£)</option>
        <option value="JPY">JPY - Japanese Yen (¥)</option>
        <option value="CAD">CAD - Canadian Dollar (C$)</option>
        <option value="AUD">AUD - Australian Dollar (A$)</option>
        <option value="CNY">CNY - Chinese Yuan (¥)</option>
        <option value="INR">INR - Indian Rupee (₹)</option>
      </select>
    );
  }