import React from 'react';
import { TrendingUp, PieChart, LineChart } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
    <div className="text-blue-500 dark:text-blue-400 mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
      {title}
    </h3>
    <p className="text-gray-600 dark:text-gray-300">
      {description}
    </p>
  </div>
);

export const HeroSection: React.FC = () => {
  return (
    <div className="text-center py-16">
      <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
        Welcome to <span className="text-blue-600 dark:text-blue-400">NAVigator</span>
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
        Your comprehensive platform for analyzing mutual funds. Track performance, compare schemes, 
        and make informed investment decisions.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <FeatureCard
          icon={<TrendingUp size={32} />}
          title="Performance Tracking"
          description="Monitor NAV trends and historical performance with interactive charts and detailed analytics."
        />
        <FeatureCard
          icon={<PieChart size={32} />}
          title="Fund Comparison"
          description="Compare multiple schemes side by side to identify the best investment opportunities."
        />
        <FeatureCard
          icon={<LineChart size={32} />}
          title="Advanced Analytics"
          description="Access comprehensive metrics including CAGR, volatility, and risk-adjusted returns."
        />
      </div>
    </div>
  );
};