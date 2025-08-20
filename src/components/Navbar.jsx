import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { name: 'Home', to: '/' },
  { name: 'Services', to: '/services' },
  { name: 'About', to: '/about' },
  { name: 'Blogs', to: '/blogs' },
  { name: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 dark:bg-dark/90 backdrop-blur border-b border-gray-200 dark:border-neutral-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 w-full">
        <Link to="/" className="flex items-center gap-2 select-none">
          <span className="text-2xl font-bold bg-gradient-to-br from-primary-blue via-primary-green to-primary-violet bg-clip-text text-transparent tracking-tight">Vigyapana</span>
        </Link>
        <div className="hidden md:flex gap-6">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `group relative px-2 py-1 font-medium transition-colors duration-200 text-gray-700 dark:text-gray-100 hover:text-primary-blue dark:hover:text-primary-green ${isActive ? 'text-primary-blue dark:text-primary-green' : ''}`
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  {/* Active underline */}
                  <motion.span
                    layoutId="underline"
                    className={`absolute left-0 -bottom-1 h-0.5 w-full rounded bg-gradient-to-r from-primary-blue via-primary-green to-primary-violet transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}
                  />
                  {/* Hover underline (only when not active) */}
                  {!isActive && (
                    <span
                      className="pointer-events-none absolute left-0 -bottom-1 h-0.5 w-full rounded bg-gradient-to-r from-primary-blue via-primary-green to-primary-violet opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
        
        {/* Theme Toggle - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
        </div>
        
        {/* Mobile Menu Controls */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            className="flex flex-col gap-1.5 group"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(v => !v)}
        >
            <span className="w-7 h-0.5 bg-gray-600 dark:bg-gray-200 rounded transition-all group-hover:bg-primary-blue" />
            <span className="w-7 h-0.5 bg-gray-600 dark:bg-gray-200 rounded transition-all group-hover:bg-primary-green" />
            <span className="w-7 h-0.5 bg-gray-600 dark:bg-gray-200 rounded transition-all group-hover:bg-primary-violet" />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white dark:bg-dark border-t border-gray-200 dark:border-neutral-800 px-4 pb-4 transition-colors duration-300"
          >
            <div className="flex flex-col gap-3 mt-2">
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `group relative px-2 py-2 rounded font-medium transition-colors duration-200 text-gray-700 dark:text-gray-100 hover:text-primary-blue dark:hover:text-primary-green ${isActive ? 'text-primary-blue dark:text-primary-green' : ''}`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {({ isActive }) => (
                    <>
                      {link.name}
                      {/* Active underline */}
                      <span
                        className={`absolute left-0 -bottom-1 h-0.5 w-full rounded bg-gradient-to-r from-primary-blue via-primary-green to-primary-violet transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}
                      />
                      {/* Hover underline (only when not active) */}
                      {!isActive && (
                        <span
                          className="pointer-events-none absolute left-0 -bottom-1 h-0.5 w-full rounded bg-gradient-to-r from-primary-blue via-primary-green to-primary-violet opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
} 