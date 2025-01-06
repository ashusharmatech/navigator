import React from 'react';
import { BarChart2, Plus, Check } from 'lucide-react';
import { MutualFundScheme } from '../types/mutual-fund';
import { useComparison } from '../hooks/useComparison';

interface CompareButtonProps {
  scheme: MutualFundScheme;
}

export const CompareButton: React.FC<CompareButtonProps> = ({ scheme }) => {
  const { selectedFunds, addFund, removeFund } = useComparison();
  const isSelected = selectedFunds.some(f => f.schemeCode === scheme.schemeCode);
  const canAdd = selectedFunds.length < 3;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isSelected) {
      removeFund(scheme.schemeCode);
    } else if (canAdd) {
      addFund(scheme);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={!isSelected && !canAdd}
      className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm font-medium
        ${isSelected 
          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
          : canAdd
            ? 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            : 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500 cursor-not-allowed'
        }`}
    >
      {isSelected ? (
        <>
          <Check size={16} />
          <span>Added</span>
        </>
      ) : (
        <>
          <Plus size={16} />
          <span>Compare</span>
        </>
      )}
    </button>
  );
};