import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { MutualFundScheme } from '../types/mutual-fund';

interface SearchBoxProps {
  schemes: MutualFundScheme[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  className?: string;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  schemes,
  searchTerm,
  onSearchChange,
  className = ''
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const suggestions = schemes
    .filter(scheme =>
      scheme.schemeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.schemeCode.toString().includes(searchTerm)
    )
    .slice(0, 5);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSuggestionClick = (scheme: MutualFundScheme) => {
    onSearchChange(scheme.schemeName);
    setShowSuggestions(false);
    navigate(`/scheme/${scheme.schemeCode}`);
  };

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <div className="relative">
        <input
          type="text"
          placeholder="Search mutual funds..."
          className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
            bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
      </div>

      {showSuggestions && searchTerm && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600">
          {suggestions.length > 0 ? (
            suggestions.map((scheme) => (
              <button
                key={scheme.schemeCode}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                onClick={() => handleSuggestionClick(scheme)}
              >
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {scheme.schemeName}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Scheme Code: {scheme.schemeCode}
                </div>
              </button>
            ))
          ) : (
            <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
              No matches found
            </div>
          )}
        </div>
      )}
    </div>
  );
};