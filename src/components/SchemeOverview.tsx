import React from 'react';
import { SchemeDetails } from '../types/mutual-fund';
import { formatDistanceToNow, parse } from 'date-fns';

interface SchemeOverviewProps {
  schemeDetails: SchemeDetails;
}

export const SchemeOverview: React.FC<SchemeOverviewProps> = ({ schemeDetails }) => {
  const { meta, data } = schemeDetails;
  const latestNAV = data[0];
  const navDate = parse(latestNAV.date, 'dd-MM-yyyy', new Date());

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{meta.scheme_name}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Latest NAV</h3>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">₹{parseFloat(latestNAV.nav).toFixed(2)}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              as of {latestNAV.date} ({formatDistanceToNow(navDate, { addSuffix: true })})
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Fund House</h3>
            <p className="text-gray-600 dark:text-gray-400">{meta.fund_house}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Category</h3>
            <p className="text-gray-600 dark:text-gray-400">{meta.scheme_category}</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Type</h3>
            <p className="text-gray-600 dark:text-gray-400">{meta.scheme_type}</p>
          </div>
          
          {meta.isin_growth && (
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">ISIN</h3>
              <p className="text-gray-600 dark:text-gray-400">{meta.isin_growth}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};