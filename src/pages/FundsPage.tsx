import React from 'react';
import { SchemeFilters } from '../components/SchemeFilters';
import { FundGrid } from '../components/FundGrid';
import { useSchemes } from '../hooks/useSchemes';

export function FundsPage() {
  const {
    schemes,
    filters,
    loading,
    error,
    handleFilterChange,
    filteredSchemes
  } = useSchemes();

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-16">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        All Mutual Funds
      </h1>

      <SchemeFilters
        schemes={schemes}
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <FundGrid schemes={filteredSchemes} loading={loading} />
    </div>
  );
}