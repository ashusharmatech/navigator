import React from 'react';
import { MutualFundScheme } from '../types/mutual-fund';

interface SchemeListProps {
  schemes: MutualFundScheme[];
  onSchemeSelect: (scheme: MutualFundScheme) => void;
  selectedSchemeCode?: number;
}

export const SchemeList: React.FC<SchemeListProps> = ({ 
  schemes, 
  onSchemeSelect,
  selectedSchemeCode 
}) => {
  return (
    <div className="w-full max-w-3xl">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="max-h-[600px] overflow-y-auto">
          {schemes.map((scheme) => (
            <button
              key={scheme.schemeCode}
              className={`w-full text-left p-4 border-b border-gray-200 dark:border-gray-700 
                hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors
                ${selectedSchemeCode === scheme.schemeCode ? 'bg-blue-50 dark:bg-blue-900/50' : ''}`}
              onClick={() => onSchemeSelect(scheme)}
            >
              <h3 className="font-medium text-gray-900 dark:text-white">{scheme.schemeName}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Scheme Code: {scheme.schemeCode}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};