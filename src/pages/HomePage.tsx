import React from 'react';
import { MutualFundScheme } from '../types/mutual-fund';
import { HeroSection } from '../components/HeroSection';
import { SearchBox } from '../components/SearchBox';
import { AdPlacement } from '../components/AdPlacement';

interface HomePageProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  schemes: MutualFundScheme[];
  loading: boolean;
}

export function HomePage({
  searchTerm,
  onSearchChange,
  schemes,
  loading
}: HomePageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pt-20">
      <HeroSection />
      
      <div className="max-w-2xl mx-auto mt-12">
        <SearchBox
          schemes={schemes}
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          loading={loading}
          className="mb-8"
        />
      </div>

      {/* Educational content - always visible */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Understanding Mutual Funds</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Mutual funds are investment vehicles that pool money from multiple investors to purchase a diversified portfolio of stocks, bonds, or other securities. This pooling allows individual investors to gain exposure to a broader range of investments than they might be able to access individually.
          </p>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Key Benefits:</h3>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
            <li>Professional Management</li>
            <li>Diversification</li>
            <li>Liquidity</li>
            <li>Accessibility</li>
            <li>Transparency</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Investment Strategies</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Successful mutual fund investing requires a well-thought-out strategy aligned with your financial goals and risk tolerance. Consider these proven approaches:
          </p>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Systematic Investment Plan (SIP)</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Invest fixed amounts regularly to benefit from rupee-cost averaging and market fluctuations.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Asset Allocation</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Distribute investments across different asset classes to optimize risk-adjusted returns.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <AdPlacement position="content" />
      </div>
    </div>
  );
}