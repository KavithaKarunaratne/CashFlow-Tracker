import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaPlusCircle, FaListAlt, FaTags, FaBars } from "react-icons/fa";

const navItems = [
  { name: "Home", path: "/", icon: <FaHome /> },
  { name: "Add Transaction", path: "/add", icon: <FaPlusCircle /> },
  { name: "View Transactions", path: "/expenses", icon: <FaListAlt /> },
  // Remove Manage Tags from here!
];

export default function Sidebar({ onManageTagsClick }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger for mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-30 bg-white p-2 rounded shadow"
        onClick={() => setOpen(!open)}
        aria-label="Open sidebar"
      >
        <FaBars size={24} />
      </button>

      {/* Sidebar */}
      <aside
        className={`h-screen w-56 bg-white shadow-md flex flex-col fixed left-0 top-0 z-20
          transition-transform duration-200
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:block
        `}
      >
        <div className="text-2xl font-bold text-center py-6 text-blue-700 tracking-wide">
          CashFlow Tracker
        </div>
        <nav className="flex-1 flex flex-col gap-2 px-4">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg text-base font-medium transition-colors ${
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-blue-50"
                }`
              }
              end
              onClick={() => setOpen(false)} // close on mobile nav
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}

          {/* Add Manage Tags as a button */}
          <button
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-blue-50 transition-colors mt-2"
            onClick={() => {
              setOpen(false); // close sidebar on mobile
              if (onManageTagsClick) onManageTagsClick();
            }}
            type="button"
          >
            <span className="text-lg"><FaTags /></span>
            Manage Tags
          </button>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-10 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}