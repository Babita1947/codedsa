import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CodeBite from '../../assets/CodeBite.png';
import { useAuth } from '@/context/AuthContext';
import { User, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore', path: '/about' },
    { name: 'Problems', path: '/problems' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white dark:bg-[#1a1a1a] border-b border-neutral-200 dark:border-[#282828] text-neutral-800 dark:text-neutral-200 transition-colors font-sans">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 h-12">
        {/* Logo */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 group">
            <img src={CodeBite} className="h-7 w-7 rounded-full" alt="Logo" />
            <span className="text-lg font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
              CodeDSA
            </span>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-1 text-xs sm:text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`px-3 py-1.5 rounded-md transition ${
                      isActive
                        ? "text-neutral-900 dark:text-white font-semibold bg-neutral-100 dark:bg-[#282828]"
                        : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-[#222222]"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right side: theme toggle + profile + mobile menu toggle */}
        <div className="flex items-center gap-2.5">
          <ThemeToggle />

          {/* Profile Icon / Auth */}
          {isAuthenticated ? (
            <Link to="/profile" className="relative group">
              <img
                className="w-7 h-7 rounded-full border border-neutral-300 dark:border-neutral-600 group-hover:border-[#00b8a3] transition"
                src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                alt="user"
              />
            </Link>
          ) : (
            <div className="hidden sm:flex items-center gap-2 text-xs font-medium">
              <Link
                to="/signin"
                className="px-3 py-1 rounded-md text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-[#282828] transition"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-3 py-1 rounded-md bg-[#00b8a3] hover:bg-[#00a390] text-white transition shadow-xs"
              >
                Register
              </Link>
            </div>
          )}

          {/* Hamburger button (mobile only) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-1.5 rounded-md text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-[#282828]"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-[#1a1a1a] px-4 pb-4 border-t border-neutral-200 dark:border-[#282828]">
          <ul className="flex flex-col gap-1 pt-2 text-sm font-medium">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-[#282828] text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition"
                >
                  {link.name}
                </Link>
              </li>
            ))}
            {!isAuthenticated && (
              <div className="flex flex-col gap-2 pt-2 mt-2 border-t border-neutral-200 dark:border-[#282828]">
                <Link
                  to="/signin"
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-2 text-center text-xs font-medium rounded-md border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-2 text-center text-xs font-medium rounded-md bg-[#00b8a3] text-white"
                >
                  Register
                </Link>
              </div>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
