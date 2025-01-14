import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, useMemo } from 'react';
import { MutualFundScheme, SchemeDetails } from '../types/mutual-fund';
import { api } from '../api/mutual-fund';
import { parseSchemeDetails } from '../utils/filterUtils';

export function useSchemes() {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState({
    amc: [] as string[],
    planType: [] as string[],
    dividendOption: [] as string[],
    fundType: [] as string[],
  });

  const { data: schemes = [], isLoading, error } = useQuery({
    queryKey: ['schemes'],
    queryFn: api.getAllSchemes,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    cacheTime: 30 * 60 * 1000, // Keep data in cache for 30 minutes
  });

  const { data: selectedScheme, isLoading: isLoadingScheme } = useQuery({
    queryKey: ['selectedScheme'],
    queryFn: () => null,
    enabled: false,
  });

  const handleSchemeSelect = async (scheme: MutualFundScheme) => {
    queryClient.prefetchQuery({
      queryKey: ['scheme', scheme.schemeCode],
      queryFn: () => api.getHistoricalNAV(scheme.schemeCode),
    });
  };

  const handleFilterChange = (filterType: string, values: string[]) => {
    setFilters(prev => ({ ...prev, [filterType]: values }));
  };

  const filteredSchemes = useMemo(() => {
    return schemes.filter(scheme => {
      const details = parseSchemeDetails(scheme.schemeName);
      
      const matchesAMC = filters.amc.length === 0 || 
        filters.amc.includes(details.amc);
      const matchesPlanType = filters.planType.length === 0 || 
        filters.planType.includes(details.planType);
      const matchesDividendOption = filters.dividendOption.length === 0 || 
        filters.dividendOption.includes(details.dividendOption);
      const matchesFundType = filters.fundType.length === 0 || 
        filters.fundType.includes(details.fundType);

      return matchesAMC && matchesPlanType && matchesDividendOption && matchesFundType;
    });
  }, [schemes, filters]);

  return {
    schemes,
    selectedScheme,
    loading: isLoading || isLoadingScheme,
    error: error ? 'Failed to fetch mutual fund schemes. Please try again later.' : null,
    filters,
    handleSchemeSelect,
    handleFilterChange,
    filteredSchemes
  };
}