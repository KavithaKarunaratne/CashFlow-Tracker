// src/components/Notification.jsx
import { useEffect } from "react";

export default function Notification({
  type = "info",
  message,
  onClose,
  duration = 3000,
}) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [onClose, duration]);

  const colors = {
    success: "bg-green-100 text-green-800 border-green-400",
    error: "bg-red-100 text-red-800 border-red-400",
    info: "bg-blue-100 text-blue-800 border-blue-400",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-400",
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 border-l-4 px-4 py-3 rounded shadow transition-all duration-300 animate-slide-in ${colors[type]}`}
      style={{ minWidth: "250px", maxWidth: "90vw" }}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 text-lg font-bold">&times;</button>
      </div>
    </div>
  );
}