// src/components/Input.jsx
export default function Input({
    label,
    type = "text",
    value,
    onChange,
    placeholder = "",
    error = "",
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
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-500 mt-1">{error}</p>
        )}
      </div>
    );
  }