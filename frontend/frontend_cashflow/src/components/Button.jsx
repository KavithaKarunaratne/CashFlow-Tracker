export default function Button({
    children,
    variant = "primary",
    disabled = false,
    onClick,
    type = "button",
    className = "",
    ...props
  }) {
    const base =
      "px-4 py-2 rounded font-medium transition-colors focus:outline-none";
    const variants = {
      primary: "bg-blue-600 text-white hover:bg-blue-700",
      secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
      danger: "bg-red-600 text-white hover:bg-red-700",
    };
  
    return (
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={`${base} ${variants[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }