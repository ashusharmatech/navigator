import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SchemeDetails } from '../types/mutual-fund';
import { api } from '../api/mutual-fund';
import { SchemeOverview } from '../components/SchemeOverview';
import { NAVHistory } from '../components/NAVHistory';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';

export function FundDetailsPage() {
  const { schemeCode } = useParams<{ schemeCode: string }>();
  const [schemeDetails, setSchemeDetails] = useState<SchemeDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!schemeCode) return;
      
      try {
        setLoading(true);
        setError(null);
        const data = await api.getHistoricalNAV(parseInt(schemeCode));
        setSchemeDetails(data);
      } catch (err) {
        setError('Failed to fetch scheme details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [schemeCode]);

  if (loading) {
    return <LoadingSpinner message="Loading fund details..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!schemeDetails) {
    return <ErrorMessage message="Fund details not found." />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-16">
      <SchemeOverview schemeDetails={schemeDetails} />
      <div className="mt-8">
        <NAVHistory navData={schemeDetails.data} />
      </div>
    </div>
  );
}