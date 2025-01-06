import React from 'react';
import { Link } from 'react-router-dom';
import { MutualFundScheme } from '../types/mutual-fund';
import { TrendingUp, Info } from 'lucide-react';
import { CompareButton } from './CompareButton';

interface FundGridProps {
  schemes: MutualFundScheme[];
  loading: boolean;
}

export const FundGrid: React.FC<FundGridProps> = ({ schemes, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse"
          >
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  // Only show first 30 schemes in grid view for better performance
  const displayedSchemes = schemes.slice(0, 30);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayedSchemes.map((scheme) => (
        <div key={scheme.schemeCode} className="relative">
          <Link
            to={`/scheme/${scheme.schemeCode}`}
            className="block bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow group"
          >
            <div className="flex items-start justify-between">
              <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                {scheme.schemeName}
              </h3>
              <TrendingUp className="text-gray-400 group-hover:text-blue-500 transition-colors" size={20} />
            </div>
            
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm">
                <Info size={16} className="text-gray-400 mr-2" />
                <span className="text-gray-600 dark:text-gray-300">Scheme Code:</span>
                <span className="ml-2 text-gray-900 dark:text-white">{scheme.schemeCode}</span>
              </div>
            </div>
          </Link>
          <div className="absolute bottom-4 right-4">
            <CompareButton scheme={scheme} />
          </div>
        </div>
      ))}
    </div>
  );
};