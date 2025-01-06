import React from 'react';
import { NAVData } from '../types/mutual-fund';
import { calculateStats } from '../utils/navCalculations';

interface NAVStatsProps {
  navData: NAVData[];
}

export const NAVStats: React.FC<NAVStatsProps> = ({ navData }) => {
  const { high, low, cagr } = calculateStats(navData);

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
        <p className="text-sm text-gray-500 dark:text-gray-400">High</p>
        <p className="text-xl font-bold text-gray-900 dark:text-white">
          {high > 0 ? `₹ ${high.toFixed(2)}` : '-'}
        </p>
      </div>
      <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
        <p className="text-sm text-gray-500 dark:text-gray-400">Low</p>
        <p className="text-xl font-bold text-gray-900 dark:text-white">
          {low > 0 ? `₹ ${low.toFixed(2)}` : '-'}
        </p>
      </div>
      <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
        <p className="text-sm text-gray-500 dark:text-gray-400">CAGR</p>
        <p className={`text-xl font-bold ${cagr >= 0 ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
          {cagr !== 0 ? `${cagr > 0 ? '+' : ''}${cagr.toFixed(2)}%` : '-'}
        </p>
      </div>
    </div>
  );
};