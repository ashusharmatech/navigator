import React from 'react';
import { X } from 'lucide-react';

interface TableFiltersProps {
  filters: Record<string, string>;
  onFilterChange: (key: string, value: string) => void;
  onClearFilter: (key: string) => void;
}

export const TableFilters: React.FC<TableFiltersProps> = ({
  filters,
  onFilterChange,
  onClearFilter,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
    {Object.entries(filters).map(([key, value]) => (
      <div key={key} className="relative">
        <input
          type="text"
          placeholder={`Filter ${key}...`}
          value={value}
          onChange={(e) => onFilterChange(key, e.target.value)}
          className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500
            bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
        />
        {value && (
          <button
            onClick={() => onClearFilter(key)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    ))}
  </div>
);