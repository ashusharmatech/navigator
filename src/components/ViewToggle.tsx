import React from 'react';
import { Grid, List } from 'lucide-react';

interface ViewToggleProps {
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({
  viewMode,
  onViewModeChange,
}) => (
  <div className="flex items-center space-x-2 mb-6">
    <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">View:</span>
    <button
      onClick={() => onViewModeChange('list')}
      className={`p-2 rounded-lg transition-colors ${
        viewMode === 'list'
          ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
      aria-label="List view"
    >
      <List className="h-5 w-5" />
    </button>
    <button
      onClick={() => onViewModeChange('grid')}
      className={`p-2 rounded-lg transition-colors ${
        viewMode === 'grid'
          ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
      aria-label="Grid view"
    >
      <Grid className="h-5 w-5" />
    </button>
  </div>
);