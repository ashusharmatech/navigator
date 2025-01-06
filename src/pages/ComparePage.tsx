import React from 'react';
import { useComparison } from '../hooks/useComparison';
import { NAVHistory } from '../components/NAVHistory';
import { useSchemeDetails } from '../hooks/useSchemeDetails';
import { X } from 'lucide-react';

export function ComparePage() {
  const { selectedFunds, removeFund, clearFunds } = useComparison();
  const schemes = useSchemeDetails(selectedFunds.map(f => f.schemeCode));

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Compare Funds {selectedFunds.length > 0 && `(${selectedFunds.length})`}
        </h1>
        {selectedFunds.length > 0 && (
          <button
            onClick={() => clearFunds()}
            className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
          >
            Clear All
          </button>
        )}
      </div>

      {selectedFunds.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">
            Select up to 3 funds to compare their performance
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {schemes.map((scheme, index) => (
            <div key={scheme?.meta.scheme_code ?? index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              {scheme ? (
                <>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {scheme.meta.scheme_name}
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {scheme.meta.fund_house}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFund(scheme.meta.scheme_code)}
                      className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <NAVHistory navData={scheme.data} />
                </>
              ) : (
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};