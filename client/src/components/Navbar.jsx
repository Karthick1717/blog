import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    const html = document.documentElement;
    html.classList.toggle("dark");

    localStorage.setItem(
      "theme",
      html.classList.contains("dark") ? "dark" : "light"
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false); // 🔥 update state
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/70 dark:bg-gray-900/70 backdrop-blur-md">
      <div className="flex items-center justify-between max-w-6xl px-4 py-3 mx-auto">
        
        <Link to="/" className="text-xl font-semibold text-brand-500">
          BlogApp
        </Link>

        <div className="items-center hidden gap-6 md:flex">
          <Link to="/">Home</Link>
          <Link to="/create">Create</Link>
          <Link to="/profile">Profile</Link>

          {isLoggedIn ? (
            <button onClick={handleLogout} className="text-red-500">
              Logout
            </button>
          ) : (
            <Link to="/login">Login</Link>
          )}

          <button onClick={toggleDarkMode}>🌙</button>
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="flex flex-col gap-3 px-4 pb-4 md:hidden">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/create" onClick={() => setMenuOpen(false)}>Create</Link>
          <Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>

          {isLoggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="text-red-500"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
          )}

          <button onClick={toggleDarkMode}>🌙 Toggle Theme</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;