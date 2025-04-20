export default function SummaryCard({ label, value, positive, negative, currency }) {
    return (
      <div className="flex-1 bg-white rounded-lg shadow p-6 flex flex-col items-center">
        <div className="font-semibold mb-1">{label}</div>
        <div className={`text-2xl font-bold ${positive ? "text-green-600" : "text-red-500"}`}>
          {negative && "-"}
          {currency}{Math.abs(value).toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </div>
      </div>
    );
  }