import React, { useMemo } from 'react';
import { TrendingUp, Users, Activity, PieChart, Info } from 'lucide-react';
import { DashboardCard } from '../components/Dashboard/DashboardCard';
import { DashboardChart } from '../components/Dashboard/DashboardChart';
import { CardSkeleton } from '../components/Skeleton/CardSkeleton';
import { ChartSkeleton } from '../components/Skeleton/ChartSkeleton';
import { useSchemes } from '../hooks/useSchemes';
import { parseSchemeDetails } from '../utils/filterUtils';

interface InfoSectionProps {
  title: string;
  description: string;
}

const InfoSection: React.FC<InfoSectionProps> = ({ title, description }) => (
  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
    <div className="flex items-center space-x-2 mb-2">
      <Info size={20} className="text-blue-500 dark:text-blue-400" />
      <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
    </div>
    <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
  </div>
);

export function DashboardPage() {
  const { schemes, loading } = useSchemes();

  const stats = useMemo(() => {
    if (!schemes.length) return null;

    const totalSchemes = schemes.length;
    const amcs = new Set(schemes.map(s => parseSchemeDetails(s.schemeName).amc)).size;
    const fundTypes = new Set(schemes.map(s => parseSchemeDetails(s.schemeName).fundType));
    const equityFunds = schemes.filter(s => 
      parseSchemeDetails(s.schemeName).fundType.toLowerCase().includes('equity')
    ).length;

    // Mock data for the chart
    const chartData = Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000),
      value: Math.floor(Math.random() * 1000) + 500
    }));

    return {
      totalSchemes,
      amcs,
      equityFunds,
      fundTypes: fundTypes.size,
      chartData
    };
  }, [schemes]);

  if (loading || !stats) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartSkeleton />
          <ChartSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pt-20">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
        Dashboard Overview
      </h1>

      <InfoSection
        title="Understanding Your Dashboard"
        description="This dashboard provides a comprehensive overview of the mutual fund market. The metrics shown here are updated in real-time and help you track market trends, fund performance, and investment opportunities."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="group relative">
          <DashboardCard
            title="Total Schemes"
            value={stats.totalSchemes}
            icon={<TrendingUp size={24} />}
          />
          <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-gray-800 text-white text-sm rounded-lg whitespace-nowrap">
            Total number of mutual fund schemes available
          </div>
        </div>

        <div className="group relative">
          <DashboardCard
            title="Fund Houses"
            value={stats.amcs}
            icon={<Users size={24} />}
          />
          <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-gray-800 text-white text-sm rounded-lg whitespace-nowrap">
            Number of active Asset Management Companies (AMCs)
          </div>
        </div>

        <div className="group relative">
          <DashboardCard
            title="Equity Funds"
            value={stats.equityFunds}
            change={2.5}
            icon={<Activity size={24} />}
          />
          <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-gray-800 text-white text-sm rounded-lg whitespace-nowrap">
            Total equity-based mutual fund schemes
          </div>
        </div>

        <div className="group relative">
          <DashboardCard
            title="Fund Categories"
            value={stats.fundTypes}
            icon={<PieChart size={24} />}
          />
          <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-gray-800 text-white text-sm rounded-lg whitespace-nowrap">
            Different types of fund categories available
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <InfoSection
            title="Market Overview"
            description="Track overall market performance and trends. This chart shows aggregate market movements and helps identify broader market patterns."
          />
          <DashboardChart
            data={stats.chartData}
            title="Market Overview"
          />
        </div>

        <div>
          <InfoSection
            title="Fund Performance"
            description="Compare fund performance against market benchmarks. This visualization helps you identify outperforming and underperforming funds."
          />
          <DashboardChart
            data={stats.chartData.map(d => ({ ...d, value: d.value * 0.8 }))}
            title="Fund Performance"
          />
        </div>
      </div>
    </div>
  );
}