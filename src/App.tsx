import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { SchemePage } from './pages/SchemePage';
import { MainLayout } from './layouts/MainLayout';
import { useSchemes } from './hooks/useSchemes';

export function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const {
    schemes,
    loading: schemesLoading,
    error,
    filters,
    handleFilterChange,
    filteredSchemes
  } = useSchemes();

  return (
    <BrowserRouter>
      <MainLayout>
        <Navbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          schemes={schemes}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          loading={schemesLoading}
        />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                schemes={schemes}
                loading={schemesLoading}
              />
            }
          />
          <Route
            path="/search"
            element={
              <SearchPage
                schemes={schemes}
                loading={schemesLoading}
                error={error}
                filters={filters}
                onFilterChange={handleFilterChange}
                filteredSchemes={filteredSchemes}
                viewMode={viewMode}
              />
            }
          />
          <Route path="/scheme/:schemeCode" element={<SchemePage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}