import React, { useMemo } from 'react';
import { MutualFundScheme } from '../types/mutual-fund';
import { MultiSelect } from './MultiSelect';
import {
  getUniqueValues,
  extractAMC,
  extractPlanType,
  extractDividendOption,
  extractFundType,
} from '../utils/filterUtils';

interface FilterProps {
  schemes: MutualFundScheme[];
  filters: {
    amc: string[];
    planType: string[];
    dividendOption: string[];
    fundType: string[];
  };
  onFilterChange: (filterType: string, values: string[]) => void;
}

export const SchemeFilters: React.FC<FilterProps> = ({
  schemes,
  filters,
  onFilterChange,
}) => {
  const filterOptions = useMemo(() => ({
    amcs: getUniqueValues(schemes, extractAMC),
    planTypes: getUniqueValues(schemes, extractPlanType),
    dividendOptions: getUniqueValues(schemes, extractDividendOption),
    fundTypes: getUniqueValues(schemes, extractFundType),
  }), [schemes]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Filters
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MultiSelect
          label="AMC"
          options={filterOptions.amcs}
          value={filters.amc}
          onChange={(values) => onFilterChange('amc', values)}
        />
        <MultiSelect
          label="Plan Type"
          options={filterOptions.planTypes}
          value={filters.planType}
          onChange={(values) => onFilterChange('planType', values)}
        />
        <MultiSelect
          label="Option"
          options={filterOptions.dividendOptions}
          value={filters.dividendOption}
          onChange={(values) => onFilterChange('dividendOption', values)}
        />
        <MultiSelect
          label="Fund Type"
          options={filterOptions.fundTypes}
          value={filters.fundType}
          onChange={(values) => onFilterChange('fundType', values)}
        />
      </div>
    </div>
  );
};