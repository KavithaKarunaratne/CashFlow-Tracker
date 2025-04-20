import { FaTimes } from "react-icons/fa";

export default function Modal({ isOpen, onClose, title, children, position = "center" }) {
  if (!isOpen) return null;

  // Choose modal style based on position prop
  const modalPosition =
    position === "right"
      ? "items-start justify-end"
      : "items-center justify-center";

  const modalBoxStyle =
    position === "right"
      ? "h-full w-full max-w-sm md:max-w-md rounded-l-lg"
      : "w-full max-w-md rounded-lg";

  return (
    <div className={`fixed inset-0 z-40 flex ${modalPosition} bg-black bg-opacity-70`}>
      <div className={`bg-white shadow-lg mx-4 p-6 relative ${modalBoxStyle}`}>
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
          onClick={onClose}
          aria-label="Close modal"
        >
          <FaTimes size={20} />
        </button>
        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
        <div>{children}</div>
      </div>
    </div>
  );
}