import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SearchBox } from './SearchBox';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { MutualFundScheme } from '../types/mutual-fund';
import { LayoutDashboard, Menu, X } from 'lucide-react';

interface NavbarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  schemes?: MutualFundScheme[];
  loading?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  searchTerm, 
  onSearchChange,
  schemes = [],
  loading = false
}) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const showSearch = location.pathname !== '/';

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center flex-grow justify-center space-x-8">
            <Link
              to="/dashboard"
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 
                hover:text-blue-600 dark:hover:text-blue-400"
            >
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </Link>
            
            <Link
              to="/search"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              All Funds
            </Link>
            
            {showSearch && (
              <div className="flex-grow max-w-xl">
                <SearchBox
                  schemes={schemes}
                  searchTerm={searchTerm}
                  onSearchChange={onSearchChange}
                  loading={loading}
                />
              </div>
            )}
          </div>

          {/* Theme Toggle and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 
                hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="space-y-4">
              <Link
                to="/dashboard"
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-300 
                  hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
              </Link>
              
              <Link
                to="/search"
                className="block px-4 py-2 text-gray-600 dark:text-gray-300 
                  hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                All Funds
              </Link>
              
              {showSearch && (
                <div className="px-4">
                  <SearchBox
                    schemes={schemes}
                    searchTerm={searchTerm}
                    onSearchChange={onSearchChange}
                    loading={loading}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};