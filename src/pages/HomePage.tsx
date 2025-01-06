import React from 'react';
import { MutualFundScheme } from '../types/mutual-fund';
import { HeroSection } from '../components/HeroSection';
import { SearchBox } from '../components/SearchBox';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';

interface HomePageProps {
  schemes: MutualFundScheme[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export function HomePage({
  schemes,
  loading,
  error,
  searchTerm,
  onSearchChange,
}: HomePageProps) {
  if (loading) {
    return <LoadingSpinner message="Loading mutual funds..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pt-20">
      <HeroSection />
      
      <div className="max-w-2xl mx-auto mt-12">
        <SearchBox
          schemes={schemes}
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          className="mb-8"
        />
      </div>
    </div>
  );
}