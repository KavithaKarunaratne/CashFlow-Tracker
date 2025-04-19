// src/components/Dropdown.jsx
export default function Dropdown({
    label,
    options = [],
    value,
    onChange,
    className = "",
    ...props
  }) {
    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label className="block mb-1 text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <select
          value={value}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }