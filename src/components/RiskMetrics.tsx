import React from 'react';
import { NAVData } from '../types/mutual-fund';
import { calculateRiskMetrics } from '../utils/riskMetrics';
import { Info } from 'lucide-react';

interface RiskMetricsProps {
  navData: NAVData[];
}

export const RiskMetrics: React.FC<RiskMetricsProps> = ({ navData }) => {
  const metrics = calculateRiskMetrics(navData);

  const MetricCard = ({ title, value, info }: { title: string; value: number; info: string }) => (
    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow relative group">
      <div className="absolute top-2 right-2 cursor-help">
        <Info size={16} className="text-gray-400" />
        <div className="invisible group-hover:visible absolute right-0 w-64 p-2 mt-2 text-sm 
          bg-gray-800 text-white rounded-lg shadow-lg z-10">
          {info}
        </div>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
      <p className="text-xl font-bold text-gray-900 dark:text-white">{value}</p>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Risk Analysis</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <MetricCard
          title="Beta"
          value={metrics.beta}
          info="Measures the fund's volatility compared to the market. Beta > 1 indicates higher volatility than the market."
        />
        <MetricCard
          title="Sharpe Ratio"
          value={metrics.sharpeRatio}
          info="Risk-adjusted return measure. Higher values indicate better risk-adjusted performance."
        />
        <MetricCard
          title="Standard Deviation"
          value={metrics.standardDeviation}
          info="Measures the fund's historical volatility. Higher values indicate more volatility."
        />
        <MetricCard
          title="Alpha"
          value={metrics.alpha}
          info="Excess return of the investment relative to the return of a benchmark index."
        />
        <MetricCard
          title="R-Squared"
          value={metrics.rSquared}
          info="Percentage of the fund's movements that can be explained by movements in its benchmark index."
        />
      </div>
    </div>
  );
};