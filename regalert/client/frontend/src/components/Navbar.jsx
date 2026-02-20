
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-indigo-600">
          🚀 RegAlert
        </span>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-6">
        <Link
          to="/dashboard"
          className="text-gray-600 hover:text-indigo-600 font-medium transition"
        >
          Dashboard
        </Link>

        {userInfo && (
          <span className="text-gray-500">
            👋 {userInfo.name}
          </span>
        )}

        {userInfo && (
          <button
            onClick={handleLogout}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;