// src/components/TagChip.jsx
import { FaTimes } from "react-icons/fa";

export default function TagChip({
  label,
  color = "bg-blue-100 text-blue-700",
  onClick,
  onRemove,
  selected = false,
  className = "",
  ...props
}) {
  return (
    <span
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
        cursor-pointer transition
        ${selected ? "ring-2 ring-blue-400" : ""}
        ${color} ${className}
      `}
      onClick={onClick}
      {...props}
    >
      {label}
      {onRemove && (
        <button
          type="button"
          className="ml-2 text-xs text-gray-500 hover:text-red-500 focus:outline-none"
          onClick={e => {
            e.stopPropagation();
            onRemove();
          }}
          aria-label={`Remove ${label}`}
        >
          <FaTimes />
        </button>
      )}
    </span>
  );
}