import React, { useState } from 'react';
import { MutualFundScheme } from '../types/mutual-fund';
import { SchemeTable } from '../components/SchemeTable/SchemeTable';
import { FundGrid } from '../components/FundGrid';
import { ViewToggle } from '../components/ViewToggle';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';

interface SearchPageProps {
  schemes: MutualFundScheme[];
  loading: boolean;
  error: string | null;
  filteredSchemes: MutualFundScheme[];
}

export function SearchPage({
  schemes,
  loading,
  error,
  filteredSchemes,
}: SearchPageProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  if (loading && !schemes.length) {
    return <LoadingSpinner message="Loading mutual funds..." />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pt-20">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          All Mutual Funds
        </h1>
        <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
      </div>

      {error && <ErrorMessage message={error} />}

      {viewMode === 'list' ? (
        <SchemeTable schemes={filteredSchemes} />
      ) : (
        <FundGrid schemes={filteredSchemes} loading={loading} />
      )}
    </div>
  );
}