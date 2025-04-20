export default function TagChip({
  label,
  color = "#60A5FA", // default blue
  selected = false,
  onClick,
  onRemove,
  className = "",
  ...props
}) {
  // If using Tailwind classes from DB, color might be "border-red-400"
  // If using hex, color might be "#F87171"
  const outlineStyle = typeof color === "string" && color.startsWith("#")
    ? { borderColor: color, color: color }
    : {};

  const filledStyle = selected
    ? typeof color === "string" && color.startsWith("#")
      ? { backgroundColor: color, color: "#fff", borderColor: color }
      : {}
    : {};

  return (
    <span
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
        cursor-pointer transition border
        ${selected ? "" : ""}
        ${className}
      `}
      style={selected ? filledStyle : outlineStyle}
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
          ×
        </button>
      )}
    </span>
  );
}