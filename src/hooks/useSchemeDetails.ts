import { useState, useEffect } from 'react';
import { SchemeDetails } from '../types/mutual-fund';
import { api } from '../api/mutual-fund';

export function useSchemeDetails(schemeCodes: number[]) {
  const [schemes, setSchemes] = useState<(SchemeDetails | null)[]>(
    new Array(schemeCodes.length).fill(null)
  );

  useEffect(() => {
    const fetchDetails = async () => {
      const promises = schemeCodes.map(async (code) => {
        try {
          return await api.getHistoricalNAV(code);
        } catch (error) {
          console.error(`Error fetching scheme ${code}:`, error);
          return null;
        }
      });

      const results = await Promise.all(promises);
      setSchemes(results);
    };

    if (schemeCodes.length > 0) {
      fetchDetails();
    } else {
      setSchemes([]);
    }
  }, [schemeCodes]);

  return schemes;
}