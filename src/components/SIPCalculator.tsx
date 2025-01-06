import React, { useState, useMemo } from 'react';
import { NAVData } from '../types/mutual-fund';
import { calculateSIP } from '../utils/sipCalculations';
import { parse, subYears } from 'date-fns';

interface SIPCalculatorProps {
  navData: NAVData[];
}

export const SIPCalculator: React.FC<SIPCalculatorProps> = ({ navData }) => {
  const [amount, setAmount] = useState(1000);
  const [frequency, setFrequency] = useState<'monthly' | 'weekly'>('monthly');

  // Calculate default start date (5 years back or fund start date)
  const defaultStartDate = useMemo(() => {
    const fiveYearsAgo = subYears(new Date(), 5);
    const fundStartDate = parse(navData[navData.length - 1].date, 'dd-MM-yyyy', new Date());
    return fiveYearsAgo > fundStartDate ? fundStartDate : fiveYearsAgo;
  }, [navData]);

  const [startDate, setStartDate] = useState(defaultStartDate);

  const results = useMemo(() => {
    return calculateSIP(navData, amount, frequency, startDate);
  }, [navData, amount, frequency, startDate]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">SIP Calculator</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Investment Amount (₹)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500
              bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Frequency
          </label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value as 'monthly' | 'weekly')}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500
              bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
          >
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Start Date
          </label>
          <input
            type="date"
            value={startDate.toISOString().split('T')[0]}
            min={navData[navData.length - 1].date.split('-').reverse().join('-')}
            max={navData[0].date.split('-').reverse().join('-')}
            onChange={(e) => setStartDate(new Date(e.target.value))}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500
              bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Investment</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            ₹{results.totalInvestment.toFixed(2)}
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Current Value</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            ₹{results.currentValue.toFixed(2)}
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Returns</p>
          <p className={`text-xl font-bold ${
            results.returns >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          }`}>
            ₹{results.returns.toFixed(2)}
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">XIRR</p>
          <p className={`text-xl font-bold ${
            results.xirr >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          }`}>
            {results.xirr.toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
};