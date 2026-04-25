import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const html = document.documentElement;
    html.classList.toggle("dark");

    if (html.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-soft border-brand-200 dark:border-gray-700">
      <div className="flex items-center justify-between max-w-6xl px-4 py-3 mx-auto">
        
        {/* Logo */}
        <Link to="/" className="text-xl font-semibold text-brand-500">
          BlogApp
        </Link>

        {/* Desktop Menu */}
        <div className="items-center hidden gap-6 md:flex">
          <Link
            to="/"
            className="text-gray-700 transition dark:text-gray-300 hover:text-brand-500"
          >
            Home
          </Link>

          <Link
            to="/create"
            className="text-gray-700 transition dark:text-gray-300 hover:text-brand-500"
          >
            Create
          </Link>

          <Link
            to="/profile"
            className="text-gray-700 transition dark:text-gray-300 hover:text-brand-500"
          >
            Profile
          </Link>

          <button
            onClick={toggleDarkMode}
            className="px-3 py-1 transition rounded-md bg-brand-200 hover:bg-brand-300 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            🌙
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="text-gray-700 md:hidden dark:text-gray-300"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="flex flex-col gap-3 px-4 pb-4 bg-white border-t md:hidden dark:bg-gray-900 border-brand-200 dark:border-gray-700">
          
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 dark:text-gray-300 hover:text-brand-500"
          >
            Home
          </Link>

          <Link
            to="/create"
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 dark:text-gray-300 hover:text-brand-500"
          >
            Create
          </Link>

          <Link
            to="/profile"
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 dark:text-gray-300 hover:text-brand-500"
          >
            Profile
          </Link>

          <button
            onClick={toggleDarkMode}
            className="px-3 py-1 rounded-md w-fit bg-brand-200 dark:bg-gray-700"
          >
            🌙 Toggle Theme
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;