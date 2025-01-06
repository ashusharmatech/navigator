import React from 'react';
import { MutualFundScheme, SchemeDetails } from '../types/mutual-fund';
import { SchemeList } from './SchemeList';
import { SchemeOverview } from './SchemeOverview';
import { NAVHistory } from './NAVHistory';
import { Advertisement } from './Advertisement';
import { LoadingSpinner } from './LoadingSpinner';

interface ContentSectionProps {
  schemes: MutualFundScheme[];
  selectedScheme: SchemeDetails | null;
  loading: boolean;
  onSchemeSelect: (scheme: MutualFundScheme) => void;
}

export function ContentSection({
  schemes,
  selectedScheme,
  loading,
  onSchemeSelect
}: ContentSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <SchemeList 
          schemes={schemes} 
          onSchemeSelect={onSchemeSelect}
          selectedSchemeCode={selectedScheme?.meta.scheme_code}
        />
        
        <Advertisement 
          slot="sidebar-ad-slot" 
          format="vertical" 
          className="mt-6 hidden lg:block"
        />
      </div>

      {selectedScheme && !loading && (
        <div className="lg:col-span-2 space-y-6">
          <SchemeOverview schemeDetails={selectedScheme} />
          <Advertisement slot="content-ad-slot" format="rectangle" />
          <NAVHistory navData={selectedScheme.data} />
        </div>
      )}

      {loading && selectedScheme && (
        <LoadingSpinner message="Loading scheme details..." />
      )}
    </div>
  );
}