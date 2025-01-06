import React from 'react';
import { Link } from 'react-router-dom';
import { MutualFundScheme } from '../types/mutual-fund';

interface SearchResultsProps {
  results: MutualFundScheme[];
  onClose: () => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ results, onClose }) => {
  if (results.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg 
      max-h-96 overflow-y-auto z-50">
      {results.map((scheme) => (
        <Link
          key={scheme.schemeCode}
          to={`/fund/${scheme.schemeCode}`}
          onClick={onClose}
          className="block p-4 hover:bg-gray-50 dark:hover:bg-gray-700 border-b 
            border-gray-100 dark:border-gray-700 last:border-0"
        >
          <h4 className="font-medium text-gray-900 dark:text-white">{scheme.schemeName}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Scheme Code: {scheme.schemeCode}
          </p>
        </Link>
      ))}
    </div>
  );
};