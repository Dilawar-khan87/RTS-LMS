import React from 'react';
import { FaBars } from 'react-icons/fa';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="flex items-center justify-between bg-white shadow px-4 py-3 sticky top-0 z-10">
      {/* Menu button for mobile */}
      <button
        onClick={toggleSidebar}
        className="text-gray-700 text-2xl md:hidden focus:outline-none"
      >
        <FaBars />
      </button>

      {/* Page title */}
      <h2 className="text-xl font-semibold text-gray-800">Clerk Dashboard</h2>

      {/* User info */}
      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-gray-800">Welcome, Clerk</p>
          <p className="text-xs text-gray-500">Accountant Role</p>
        </div>
        <img
          src="https://i.pravatar.cc/300"
          alt="Avatar"
          className="w-10 h-10 rounded-full border"
        />
      </div>
    </header>
  );
};

export default Header;
