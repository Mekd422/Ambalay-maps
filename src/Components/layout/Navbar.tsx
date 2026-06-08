import { useState, useEffect } from 'react'
import { Menu, X, Moon, Sun } from 'lucide-react'
import Image from 'next/image'
import { HashLink as Link } from 'react-router-hash-link'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'
import { useTheme } from '../../context/useTheme'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const { user, token, logout } = useAuth()

  const navigate = useNavigate()
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const logoSrc = theme === 'dark' ? '/icons/ambalay-dark.png' : '/icons/ambalay-light.png'

  const isLoggedIn = !!token
  const userName = user?.firstName || 'User'

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getLinkStyles = (path: string) => {
    const isActive =
      location.pathname === path ||
      (path.includes('#') && location.pathname + location.hash === path)

    return `
      relative text-sm font-medium transition-all duration-200
      ${isActive ? 'text-[#8cff2e]' : 'text-black dark:text-white hover:text-[#8cff2e]'}
      after:absolute after:left-0 after:-bottom-2 after:h-[2px]
      after:rounded-full after:bg-[#8cff2e]
      after:transition-all after:duration-300
      ${isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'}
    `
  }

  return (
    <nav
      className={`fixed left-0 right-0 top-3 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? 'border-gray-200 bg-white/80 text-black/90 backdrop-blur-xl dark:border-white/5 dark:bg-black/20 dark:text-white'
          : 'border-transparent bg-transparent text-black dark:text-white'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src={logoSrc}
            alt="AmbaLay Maps Logo"
            width={80}
            height={80}
            className="h-14 w-14 object-contain"
          />

          <Link to="/">
            <h4 className="font-sans text-base font-medium tracking-tight text-black dark:text-white">
              AmbaLay Maps
            </h4>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          <Link to="/#solutions" className={getLinkStyles('/#solutions')}>
            About Us
          </Link>

          <Link to="/price" className={getLinkStyles('/price')}>
            Pricing
          </Link>

          <Link to="/documentation" className={getLinkStyles('/documentation')}>
            Documentation
          </Link>

          <Link to="/blog" className={getLinkStyles('/blog')}>
            Blog
          </Link>

          <Link to="/contact" className={getLinkStyles('/contact')}>
            Contact
          </Link>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300/20 bg-slate-100/80 px-4 py-2 text-sm font-medium text-slate-900 transition-all hover:bg-slate-200 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>

          {isLoggedIn ? (
            <>
              <span className="inline-flex items-center text-sm font-medium text-white">
                Hi, {userName}
              </span>

              <Link
                to="/dashboard"
                className="rounded-full bg-[#8cff2e] px-5 py-2 text-sm font-medium text-black shadow-lg transition-all hover:brightness-110"
              >
                Dashboard
              </Link>

              <button
                type="button"
                onClick={() => {
                  logout()
                  navigate('/')
                }}
                className="rounded-full border border-white/20 bg-transparent px-4 py-2 text-sm font-medium text-white transition-all hover:bg-white/10"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-full border border-white/20 px-6 py-2.5 text-sm font-medium text-white transition-all hover:border-[#8cff2e] hover:text-[#8cff2e]"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-full bg-[#8cff2e] px-6 py-2.5 text-sm font-medium text-black shadow-[0_0_15px_rgba(140,255,46,0.2)] transition-all hover:brightness-110"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="text-slate-900 dark:text-white lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute left-0 right-0 top-full z-50 border-b border-gray-200 bg-white shadow-xl text-black dark:border-white/10 dark:bg-black dark:text-white lg:hidden">
          <div className="flex flex-col items-start space-y-5 p-6">
            <Link
              to="/#solutions"
              className={getLinkStyles('/#solutions')}
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>

            <Link
              to="/price"
              className={getLinkStyles('/price')}
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>

            <Link
              to="/documentation"
              className={getLinkStyles('/documentation')}
              onClick={() => setIsMenuOpen(false)}
            >
              Documentation
            </Link>

            <Link
              to="/blog"
              className={getLinkStyles('/blog')}
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>

            <Link
              to="/contact"
              className={getLinkStyles('/contact')}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>

            <div className="w-full border-t border-white/10 pt-5">
              <button
                type="button"
                onClick={toggleTheme}
                className="w-full rounded-xl border border-slate-300/20 bg-slate-100/80 py-3 text-center text-sm font-semibold text-slate-900 transition-all hover:bg-slate-200 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
              >
                {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              </button>

              {isLoggedIn ? (
                <div className="flex flex-col gap-3">
                  <Link
                    to="/dashboard"
                    className="w-full rounded-xl bg-[#8cff2e] py-3 text-center font-semibold text-black"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>

                  <button
                    type="button"
                    className="w-full rounded-xl bg-white py-3 text-center font-semibold text-black"
                    onClick={() => {
                      logout()
                      setIsMenuOpen(false)
                      navigate('/')
                    }}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/login"
                    className="rounded-xl bg-[#1a1a1a] py-3 text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="rounded-xl bg-[#8cff2e] py-3 text-center font-semibold text-black"
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
  )
}
