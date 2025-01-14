import React, { memo } from 'react';
import { FixedSizeList as List } from 'react-window';
import { MutualFundScheme } from '../types/mutual-fund';

interface SchemeListProps {
  schemes: MutualFundScheme[];
  onSchemeSelect: (scheme: MutualFundScheme) => void;
  selectedSchemeCode?: number;
}

const SchemeRow = memo(({ data, index, style }: any) => {
  const { schemes, onSchemeSelect, selectedSchemeCode } = data;
  const scheme = schemes[index];

  return (
    <button
      key={scheme.schemeCode}
      style={style}
      className={`w-full text-left p-4 border-b border-gray-200 dark:border-gray-700 
        hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors
        ${selectedSchemeCode === scheme.schemeCode ? 'bg-blue-50 dark:bg-blue-900/50' : ''}`}
      onClick={() => onSchemeSelect(scheme)}
    >
      <h3 className="font-medium text-gray-900 dark:text-white">{scheme.schemeName}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">Scheme Code: {scheme.schemeCode}</p>
    </button>
  );
});

SchemeRow.displayName = 'SchemeRow';

export const SchemeList = memo(({ schemes, onSchemeSelect, selectedSchemeCode }: SchemeListProps) => {
  return (
    <div className="w-full max-w-3xl">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <List
          height={600}
          itemCount={schemes.length}
          itemSize={80}
          width="100%"
          itemData={{ schemes, onSchemeSelect, selectedSchemeCode }}
        >
          {SchemeRow}
        </List>
      </div>
    </div>
  );
});