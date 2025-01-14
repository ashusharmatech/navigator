import React from 'react';

export const ChartSkeleton: React.FC = () => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg animate-pulse">
    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
    <div className="h-[300px] bg-gray-200 dark:bg-gray-700 rounded"></div>
  </div>
);