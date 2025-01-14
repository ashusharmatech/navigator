import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SchemeDetails } from '../types/mutual-fund';
import { api } from '../api/mutual-fund';
import { SchemeOverview } from '../components/SchemeOverview';
import { NAVHistory } from '../components/NAVHistory';
import { SIPCalculator } from '../components/SIPCalculator';
import { RiskMetrics } from '../components/RiskMetrics';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { AdPlacement } from '../components/AdPlacement';
import { SEOHead } from '../components/SEOHead';

export function SchemePage() {
  const { schemeCode } = useParams<{ schemeCode: string }>();
  const [schemeDetails, setSchemeDetails] = useState<SchemeDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchemeDetails = async () => {
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

    fetchSchemeDetails();
  }, [schemeCode]);

  if (loading) {
    return <LoadingSpinner message="Loading scheme details..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!schemeDetails) {
    return <ErrorMessage message="Scheme not found" />;
  }

  return (
    <>
    <SEOHead
        title={`${schemeDetails.meta.scheme_name} - NAVigator`}
        description={`Analyze ${schemeDetails.meta.scheme_name} from ${schemeDetails.meta.fund_house}. View NAV history, performance metrics, and make informed investment decisions.`}
        type="article"
      />
    <div className="max-w-7xl mx-auto px-4 py-8 pt-20">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <SchemeOverview schemeDetails={schemeDetails} />
          <RiskMetrics navData={schemeDetails.data} />
          <AdPlacement position="content" />
          <NAVHistory navData={schemeDetails.data} />
          <SIPCalculator navData={schemeDetails.data} />
        </div>
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <AdPlacement position="sidebar" />
          </div>
        </div>
      </div>
    </div>
    </
  );
}