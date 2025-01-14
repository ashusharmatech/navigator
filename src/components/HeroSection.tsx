import React from 'react';
import { TrendingUp, PieChart, LineChart, BookOpen, Target, Shield } from 'lucide-react';

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
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-3xl mx-auto">
        Your comprehensive platform for analyzing mutual funds. Make informed investment decisions with our advanced analytics, real-time tracking, and expert insights.
      </p>
      <p className="text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
        Track performance, compare schemes, analyze risks, and plan your investments with professional-grade tools designed for both beginners and experienced investors.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <FeatureCard
          icon={<LineChart size={32} />}
          title="Advanced Analytics"
          description="Comprehensive analysis tools including CAGR, standard deviation, Sharpe ratio, and other key metrics for informed decision-making."
        />
        <FeatureCard
          icon={<Target size={32} />}
          title="Investment Planning"
          description="Powerful SIP calculator, goal planning tools, and portfolio optimization features to help you achieve your financial objectives."
        />
        <FeatureCard
          icon={<Shield size={32} />}
          title="Risk Assessment"
          description="Detailed risk metrics, volatility analysis, and performance comparisons to help you understand and manage investment risks."
        />
      </div>

      <div className="mt-16 bg-blue-50 dark:bg-blue-900/20 py-12 px-4 rounded-lg">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Why Choose NAVigator?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="text-left">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Real-Time Data</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Access up-to-date NAV information, historical performance data, and market insights.
            </p>
          </div>
          <div className="text-left">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Expert Analysis</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Benefit from professional-grade analytical tools and comprehensive fund research.
            </p>
          </div>
          <div className="text-left">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">User-Friendly</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Intuitive interface designed for both beginners and experienced investors.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};