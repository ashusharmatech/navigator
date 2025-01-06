import { useState, useMemo, useEffect } from 'react';
import { MutualFundScheme, SchemeDetails } from '../types/mutual-fund';
import { api } from '../api/mutual-fund';
import { parseSchemeDetails } from '../utils/filterUtils';

export function useSchemes() {
  const [schemes, setSchemes] = useState<MutualFundScheme[]>([]);
  const [selectedScheme, setSelectedScheme] = useState<SchemeDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    amc: [] as string[],
    planType: [] as string[],
    dividendOption: [] as string[],
    fundType: [] as string[],
  });

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    try {
      const data = await api.getAllSchemes();
      setSchemes(data);
    } catch (err) {
      setError('Failed to fetch mutual fund schemes. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSchemeSelect = async (scheme: MutualFundScheme) => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getHistoricalNAV(scheme.schemeCode);
      setSelectedScheme(data);
    } catch (err) {
      setError('Failed to fetch scheme details. Please try again later.');
      setSelectedScheme(null);
    } finally {
      setLoading(false);
    }
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
    loading,
    error,
    filters,
    handleSchemeSelect,
    handleFilterChange,
    filteredSchemes
  };
}