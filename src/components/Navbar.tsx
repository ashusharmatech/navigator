import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SearchBox } from './SearchBox';
import { Logo } from './Logo';
import { NavbarActions } from './NavbarActions';
import { MutualFundScheme } from '../types/mutual-fund';

interface NavbarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  schemes?: MutualFundScheme[];
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  searchTerm, 
  onSearchChange,
  schemes = [],
  viewMode,
  onViewModeChange
}) => {
  const location = useLocation();
  const showSearch = location.pathname !== '/';

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>
          
          {showSearch && (
            <div className="flex-1 max-w-2xl mx-8">
              <SearchBox
                schemes={schemes}
                searchTerm={searchTerm}
                onSearchChange={onSearchChange}
              />
            </div>
          )}

          <NavbarActions
            viewMode={viewMode}
            onViewModeChange={onViewModeChange}
          />
        </div>
      </div>
    </nav>
  );
}