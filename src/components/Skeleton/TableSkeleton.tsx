import React from 'react';

export const TableSkeleton: React.FC = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 animate-pulse">
    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex space-x-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/5"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/5"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/5"></div>
        </div>
      ))}
    </div>
  </div>
);