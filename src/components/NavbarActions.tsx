import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

export const NavbarActions: React.FC = () => (
  <div className="flex items-center space-x-4">
    <Link
      to="/search"
      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
    >
      All Funds
    </Link>
    <ThemeToggle />
  </div>
);