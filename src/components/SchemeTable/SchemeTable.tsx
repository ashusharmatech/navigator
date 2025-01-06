import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MutualFundScheme } from '../../types/mutual-fund';
import { TableHeader } from './TableHeader';
import { TableFilters } from './TableFilters';
import { parseSchemeDetails } from '../../utils/filterUtils';

interface SchemeTableProps {
  schemes: MutualFundScheme[];
}

export const SchemeTable: React.FC<SchemeTableProps> = ({ schemes }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState<{ key: string; direction: 'asc' | 'desc' | null }>({
    key: '',
    direction: null,
  });
  const [filters, setFilters] = useState({
    name: '',
    schemeCode: '',
    planType: '',
    option: '',
    fundType: '',
    amc: '',
  });

  const itemsPerPage = 20; // Increased from 10 to 20 for better performance

  const handleSort = (key: string) => {
    setSort(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
    setCurrentPage(1); // Reset to first page on sort
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const filteredAndSortedSchemes = useMemo(() => {
    let result = schemes.filter(scheme => {
      const details = parseSchemeDetails(scheme.schemeName);
      const matchName = scheme.schemeName.toLowerCase().includes(filters.name.toLowerCase());
      const matchCode = scheme.schemeCode.toString().includes(filters.schemeCode);
      const matchPlanType = !filters.planType || details.planType.toLowerCase().includes(filters.planType.toLowerCase());
      const matchOption = !filters.option || details.dividendOption.toLowerCase().includes(filters.option.toLowerCase());
      const matchFundType = !filters.fundType || details.fundType.toLowerCase().includes(filters.fundType.toLowerCase());
      const matchAMC = !filters.amc || details.amc.toLowerCase().includes(filters.amc.toLowerCase());

      return matchName && matchCode && matchPlanType && matchOption && matchFundType && matchAMC;
    });

    if (sort.key && sort.direction) {
      const multiplier = sort.direction === 'asc' ? 1 : -1;
      result.sort((a, b) => {
        const aDetails = parseSchemeDetails(a.schemeName);
        const bDetails = parseSchemeDetails(b.schemeName);
        
        const aValue = sort.key === 'name' ? a.schemeName :
                      sort.key === 'schemeCode' ? a.schemeCode.toString() :
                      aDetails[sort.key as keyof typeof aDetails];
                      
        const bValue = sort.key === 'name' ? b.schemeName :
                      sort.key === 'schemeCode' ? b.schemeCode.toString() :
                      bDetails[sort.key as keyof typeof bDetails];

        return multiplier * aValue.toString().localeCompare(bValue.toString());
      });
    }

    return result;
  }, [schemes, filters, sort]);

  const paginatedSchemes = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedSchemes.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedSchemes, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedSchemes.length / itemsPerPage);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <TableFilters
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              <TableHeader label="Name" sortKey="name" currentSort={sort} onSort={handleSort} />
              <TableHeader label="Scheme Code" sortKey="schemeCode" currentSort={sort} onSort={handleSort} />
              <TableHeader label="Plan Type" sortKey="planType" currentSort={sort} onSort={handleSort} />
              <TableHeader label="Option" sortKey="option" currentSort={sort} onSort={handleSort} />
              <TableHeader label="Fund Type" sortKey="fundType" currentSort={sort} onSort={handleSort} />
              <TableHeader label="AMC" sortKey="amc" currentSort={sort} onSort={handleSort} />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedSchemes.map((scheme) => {
              const details = parseSchemeDetails(scheme.schemeName);
              return (
                <tr
                  key={scheme.schemeCode}
                  onClick={() => navigate(`/scheme/${scheme.schemeCode}`)}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{scheme.schemeName}</td>
                  <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{scheme.schemeCode}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                      {details.planType}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                      {details.dividendOption}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                      {details.fundType}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
                      {details.amc}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredAndSortedSchemes.length)} to{' '}
          {Math.min(currentPage * itemsPerPage, filteredAndSortedSchemes.length)} of {filteredAndSortedSchemes.length} results
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm font-medium rounded-md bg-gray-100 dark:bg-gray-700 
              text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm font-medium rounded-md bg-gray-100 dark:bg-gray-700 
              text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};