import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react"; 
import logo from "../../assets/icons/download.svg";
import { HashLink as Link } from 'react-router-hash-link';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { user, token, logout } = useAuth(); // <- get user & token from context
  const navigate = useNavigate();
  const isLoggedIn = !!token;
  const userName = user?.firstName || "User";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkStyles = "text-sm font-medium hover:text-[#8cff2e] transition-colors";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? "bg-black/20 backdrop-blur-xl border-gray-200 dark:border-white/5"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-4">
        <div className="flex items-center gap-2">
          <img src={logo} alt="AmbaLay Maps Logo" className="h-11 w-11" />
          <Link to="/">
            <h4 className="text-lg font-medium font-sora tracking-tight text-black dark:text-white">
              AmbaLay Maps
            </h4>
          </Link>
        </div>

        {/* Unified Navigation Links */}
        <div className="hidden lg:flex items-center gap-8 text-black dark:text-white">
          <Link to="/#how-it-works" className={linkStyles}>About Us</Link>
          <Link to="/price" className={linkStyles}>Pricing</Link>
          <Link to="/documentation" className={linkStyles}>Documentation</Link>
          <Link to="/blog" className={linkStyles}>Blog</Link>
          <Link to="/shop" className={linkStyles}>Shop</Link>
          <Link to="/contact" className={linkStyles}>Contact</Link>
        </div>

        {/* Auth Buttons Group */}
        <div className="hidden lg:flex items-center gap-6">
          {isLoggedIn ? (
            <>
              <span className="text-sm font-medium text-black dark:text-white">
                Hi, {userName}
              </span>
              <Link
                to="/dashboard"
                className="px-5 py-2 rounded-full text-sm font-medium bg-[#8cff2e] text-white shadow-lg hover:brightness-110 transition-all"
              >
                Dashboard
              </Link>
              <button
                type="button"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="px-4 py-2 rounded-full text-sm font-medium bg-transparent border border-white/20 text-black dark:text-white hover:bg-white/10 transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-black dark:text-white hover:text-[#8cff2e] transition-colors">
                Login
              </Link>
              <Link
                to="/register"
                className="px-6 py-2.5 rounded-full text-sm font-medium bg-[#8cff2e] text-black shadow-[0_0_15px_rgba(140,255,46,0.2)] hover:brightness-110 transition-all"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <button className="lg:hidden text-black dark:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-black border-b border-gray-200 dark:border-white/10 z-50 lg:hidden shadow-xl">
          <div className="flex flex-col p-6 space-y-4 text-black dark:text-white">
            <Link to="/#how-it-works" onClick={() => setIsMenuOpen(false)}>About Us</Link>
            <Link to="/price" onClick={() => setIsMenuOpen(false)}>Pricing</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            
            <hr className="border-gray-100 dark:border-white/10" />
            
            {isLoggedIn ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-center py-3 rounded-xl bg-[#58327d] text-white font-semibold" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  className="text-center py-3 rounded-xl bg-white text-black font-semibold"
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link to="/login" className="text-center py-3 rounded-xl bg-gray-100 dark:bg-[#1a1a1a]" onClick={() => setIsMenuOpen(false)}>Login</Link>
                <Link to="/register" className="text-center py-3 rounded-xl bg-[#8cff2e] text-black font-semibold" onClick={() => setIsMenuOpen(false)}>Register</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}