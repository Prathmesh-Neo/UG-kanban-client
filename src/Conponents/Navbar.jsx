import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/authProvider";

function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-2 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto">

        {/* Logo */}
        <h1 className="text-xl font-bold">
          Task Manager
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">

          {user && (
            <>
              <Link
                to="/dashboard"
                className="hover:text-gray-200 transition"
              >
                Dashboard
              </Link>

              <Link
                to="/tasks"
                className="hover:text-gray-200 transition"
              >
                Tasks
              </Link>
              <Link
                to="/analytics"
                className="hover:text-gray-200"
                onClick={() => setMenuOpen(false)}
              >
                Analytics
              </Link>
              <button
                onClick={handleLogout}
                className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-200"
              >
                Logout
              </button>
            </>
          )}

          {!user && (
            <>
              <Link
                to="/register"
                className="hover:text-gray-200 transition"
              >
                Register
              </Link>

              <Link
                to="/login"
                className="hover:text-gray-200 transition"
              >
                Login
              </Link>
            </>
          )}

        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 mt-4 bg-blue-700 p-4 rounded">

          {user && (
            <>
              <Link
                to="/dashboard"
                className="hover:text-gray-200"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>

              <Link
                to="/tasks"
                className="hover:text-gray-200"
                onClick={() => setMenuOpen(false)}
              >
                Tasks
              </Link>
              <Link
                to="/analytics"
                className="hover:text-gray-200"
                onClick={() => setMenuOpen(false)}
              >
                Analytics
              </Link>
              <button
                onClick={handleLogout}
                className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200"
              >
                Logout
              </button>
            </>
          )}

          {!user && (
            <>
              <Link
                to="/login"
                className="hover:text-gray-200"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>

              <Link
                to="/register"
                className="hover:text-gray-200"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}

        </div>
      )}
    </nav>
  );
}

export default Navbar;