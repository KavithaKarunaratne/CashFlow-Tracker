// src/components/TransactionCard.jsx
import { FaEdit, FaTrash } from "react-icons/fa";
import TagChip from "./TagChip";

export default function TransactionCard({
  description,
  date,
  amount,
  type, // "income" or "expense"
  tags = [],
  onEdit,
  onDelete,
}) {
  const amountColor =
    type === "income"
      ? "text-green-600"
      : "text-red-600";

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between bg-white rounded-lg shadow p-4 mb-3">
      <div className="flex-1">
        <div className="font-semibold text-gray-800">{description}</div>
        <div className="text-xs text-gray-500 mb-2">{date}</div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <TagChip key={tag.id || tag.label} label={tag.label} color={tag.color} />
          ))}
        </div>
      </div>
      <div className="flex items-center mt-3 md:mt-0 gap-4">
        <span className={`font-bold text-lg ${amountColor}`}>
          {amount}
        </span>
        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={onEdit}
          aria-label="Edit transaction"
        >
          <FaEdit />
        </button>
        <button
          className="text-red-500 hover:text-red-700"
          onClick={onDelete}
          aria-label="Delete transaction"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}