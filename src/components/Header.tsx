import { useAppDispatch, useAppSelector } from "@/store/Store";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "@/store/authSlice";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn logout không?");
    if (!confirmed) return;

    // Dispatch logout thunk (sẽ xóa state + localStorage)
    await dispatch(logout());

    navigate("/login");
  };

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-gray-100 dark:bg-gray-800 shadow-md transition-colors duration-300">
      {/* Logo */}
      <a href="/">
        <img
          src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg"
          alt="Logo"
          className="h-8 w-8"
        />
      </a>

      {/* Menu */}
      <nav className="flex-grow flex justify-center gap-6">
        <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
          🏠 Home
        </Link>
        <Link to="/todo" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
          📋 Todo
        </Link>
        <Link to="/notes" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
          📒 Notes
        </Link>

        {!user ? (
          <Link to="/login" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
            🔑 Login
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="text-gray-700 dark:text-gray-300 hover:text-red-500"
          >
            🚪 Logout
          </button>
        )}
      </nav>

      {/* Toggles */}
      <div className="flex gap-4">
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </header>
  );
}
