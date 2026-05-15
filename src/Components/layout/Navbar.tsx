import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { HashLink as Link } from "react-router-hash-link";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { user, token, logout } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = !!token;
  const userName = user?.firstName || "User";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getLinkStyles = (path: string) => {
    const isActive =
      location.pathname === path ||
      (path.includes("#") &&
        location.pathname + location.hash === path);

    return `
      relative text-sm font-medium transition-all duration-200
      ${
        isActive
          ? "text-[#8cff2e]"
          : "text-white hover:text-[#8cff2e]"
      }
      after:absolute after:left-0 after:-bottom-2 after:h-[2px]
      after:rounded-full after:bg-[#8cff2e]
      after:transition-all after:duration-300
      ${
        isActive
          ? "after:w-full"
          : "after:w-0 hover:after:w-full"
      }
    `;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? "bg-black/20 backdrop-blur-xl border-gray-200 dark:border-white/5"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-start justify-between px-6 md:px-12 py-4">
        
        {/* Logo */}
        <div className="flex items-start gap-2 pt-1">
          <Image
            src="/icons/ambalay-logo.png"
            alt="AmbaLay Maps Logo"
            width={44}
            height={24}
            className="h-6 w-11"
          />

          <Link to="/">
            <h4 className="text-base font-medium font-sora tracking-tight text-white">
              AmbaLay Maps
            </h4>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-start gap-8 pt-1">
          <Link
            to="/#solutions"
            className={getLinkStyles("/#solutions")}
          >
            About Us
          </Link>

          <Link
            to="/price"
            className={getLinkStyles("/price")}
          >
            Pricing
          </Link>

          <Link
            to="/documentation"
            className={getLinkStyles("/documentation")}
          >
            Documentation
          </Link>

          <Link
            to="/blog"
            className={getLinkStyles("/blog")}
          >
            Blog
          </Link>

          <Link
            to="/contact"
            className={getLinkStyles("/contact")}
          >
            Contact
          </Link>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden lg:flex items-start gap-6 pt-[2px]">
          {isLoggedIn ? (
            <>
              <span className="pt-2 text-sm font-medium text-white">
                Hi, {userName}
              </span>

              <Link
                to="/dashboard"
                className="px-5 py-2 rounded-full text-sm font-medium bg-[#8cff2e] text-black shadow-lg hover:brightness-110 transition-all"
              >
                Dashboard
              </Link>

              <button
                type="button"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="px-4 py-2 rounded-full text-sm font-medium bg-transparent border border-white/20 text-white hover:bg-white/10 transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={getLinkStyles("/login")}
              >
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

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-black border-b border-white/10 z-50 lg:hidden shadow-xl">
          <div className="flex flex-col items-start p-6 space-y-5 text-white">

            <Link
              to="/#solutions"
              className={getLinkStyles("/#solutions")}
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>

            <Link
              to="/price"
              className={getLinkStyles("/price")}
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>

            <Link
              to="/documentation"
              className={getLinkStyles("/documentation")}
              onClick={() => setIsMenuOpen(false)}
            >
              Documentation
            </Link>

            <Link
              to="/blog"
              className={getLinkStyles("/blog")}
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>

            <Link
              to="/contact"
              className={getLinkStyles("/contact")}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>

            <div className="w-full border-t border-white/10 pt-5">
              {isLoggedIn ? (
                <div className="flex flex-col gap-3">
                  <Link
                    to="/dashboard"
                    className="w-full text-center py-3 rounded-xl bg-[#8cff2e] text-black font-semibold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>

                  <button
                    type="button"
                    className="w-full text-center py-3 rounded-xl bg-white text-black font-semibold"
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                      navigate("/");
                    }}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/login"
                    className="text-center py-3 rounded-xl bg-[#1a1a1a]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="text-center py-3 rounded-xl bg-[#8cff2e] text-black font-semibold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
