import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useTheme } from '../hooks/useTheme'
import { useState, useEffect } from 'react'
import { Sun, Moon, Menu, X, GraduationCap, ChevronRight } from 'lucide-react'
import clsx from 'clsx'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-[rgba(10,10,10,0.72)] backdrop-blur-xl border-b border-white/[0.06]'
          : 'bg-transparent border-b border-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:shadow-brand-500/30 transition-all duration-300">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight text-white">
            Counsello
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          <NavLink href="/#features">Features</NavLink>
          <NavLink href="/#colleges">Colleges</NavLink>
          <NavLink href="/#stats">Stats</NavLink>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-dark-500 hover:text-white hover:bg-white/[0.05] transition-all duration-200"
            aria-label="Toggle theme"
            id="theme-toggle"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {user ? (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/dashboard" className="btn-primary py-2 px-4 text-sm">
                Dashboard
              </Link>
              <button onClick={logout} className="btn-ghost text-sm py-2">
                Sign out
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/login" className="btn-ghost text-sm py-2">Sign in</Link>
              <Link to="/register" className="btn-primary py-2 px-4 text-sm">
                Get started <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-dark-500 hover:text-white hover:bg-white/[0.05] transition-all duration-200"
            id="mobile-menu-btn"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[rgba(10,10,10,0.92)] backdrop-blur-2xl border-b border-white/[0.06] px-4 pb-4 animate-slide-down">
          <div className="flex flex-col gap-1 pt-2">
            <MobileNavLink href="/#features" onClick={() => setMobileOpen(false)}>Features</MobileNavLink>
            <MobileNavLink href="/#colleges" onClick={() => setMobileOpen(false)}>Colleges</MobileNavLink>
            <MobileNavLink href="/#stats" onClick={() => setMobileOpen(false)}>Stats</MobileNavLink>
            <div className="h-px bg-white/[0.06] my-2" />
            {user ? (
              <>
                <Link to="/dashboard" className="btn-primary w-full justify-center">Dashboard</Link>
                <button onClick={logout} className="btn-ghost w-full justify-center">Sign out</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-ghost w-full justify-center">Sign in</Link>
                <Link to="/register" className="btn-primary w-full justify-center">Get started</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="px-3 py-2 text-sm font-medium text-dark-500 hover:text-white rounded-lg transition-colors duration-200"
    >
      {children}
    </a>
  )
}

function MobileNavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="px-3 py-2.5 text-sm font-medium text-dark-400 hover:text-white hover:bg-white/[0.04] rounded-lg transition-all duration-200"
    >
      {children}
    </a>
  )
}
