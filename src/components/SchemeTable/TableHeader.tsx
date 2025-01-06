import React from 'react';
import { ArrowUpDown } from 'lucide-react';

interface TableHeaderProps {
  label: string;
  sortKey: string;
  currentSort: { key: string; direction: 'asc' | 'desc' | null };
  onSort: (key: string) => void;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  label,
  sortKey,
  currentSort,
  onSort,
}) => {
  const isSorted = currentSort.key === sortKey;

  return (
    <th className="px-4 py-3 bg-gray-50 dark:bg-gray-700">
      <button
        className="flex items-center space-x-1 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
        onClick={() => onSort(sortKey)}
      >
        <span>{label}</span>
        <ArrowUpDown className={`h-4 w-4 ${isSorted ? 'text-blue-500' : 'text-gray-400'}`} />
      </button>
    </th>
  );
};