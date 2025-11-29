import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { authService } from "../services/authService";
import { cartService } from "../services/cartService";
import { showSuccess } from "../utils/toast";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const user = authService.getCurrentUsername();
    setUsername(user);

    if (authService.isAuthenticated()) {
      loadCartCount();
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const loadCartCount = async () => {
    const userId = authService.getCurrentUserId();
    if (userId) {
      try {
        const count = await cartService.getCartCount(userId);
        setCartCount(count);
      } catch (error) {
        console.error("Error loading cart count:", error);
      }
    }
  };

  const handleLogout = () => {
    authService.logout();
    showSuccess("Logged out successfully");
    navigate("/login");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`sticky top-0 z-50 bg-white dark:bg-gray-800 transition-all duration-300 ${
        isScrolled ? "shadow-lg" : "shadow-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          {/* SPL VARIATION POINT: Shop Branding */}
          <Link
            to="/"
            className="flex items-center space-x-2 group transition-transform duration-200"
          >
            {/* Shop Logo */}
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </div>
            <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              E
              <span className="text-primary-600 dark:text-primary-400">
                Shop
              </span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive("/")
                  ? "bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              Products
            </Link>
            {/* SPL VARIATION POINT: User Authentication - Authenticated Menu Items */}
            {username && (
              <>
                {/* SPL VARIATION POINT: Order Management Feature */}
                <Link
                  to="/orders"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive("/orders")
                      ? "bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  Orders
                </Link>
                {/* SPL VARIATION POINT: Wishlist Feature */}
                <Link
                  to="/wishlist"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive("/wishlist")
                      ? "bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  Wishlist
                </Link>
              </>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* SPL VARIATION POINT: User Authentication - Login/Logout UI */}
            {username ? (
              <>
                <div className="hidden sm:flex items-center px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Hello,
                  </span>
                  <span className="ml-1 text-sm font-semibold text-gray-800 dark:text-gray-200">
                    {username}
                  </span>
                </div>

                {/* Cart Button */}
                <Link
                  to="/cart"
                  className="relative p-2 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {cartCount}
                    </span>
                  )}
                </Link>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium transition-all"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium transition-all"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
