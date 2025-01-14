import React, { useMemo } from 'react';
import { TrendingUp, Users, Activity, PieChart } from 'lucide-react';
import { DashboardCard } from '../components/Dashboard/DashboardCard';
import { DashboardChart } from '../components/Dashboard/DashboardChart';
import { CardSkeleton } from '../components/Skeleton/CardSkeleton';
import { ChartSkeleton } from '../components/Skeleton/ChartSkeleton';
import { useSchemes } from '../hooks/useSchemes';
import { parseSchemeDetails } from '../utils/filterUtils';

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          title="Total Schemes"
          value={stats.totalSchemes}
          icon={<TrendingUp size={24} />}
        />
        <DashboardCard
          title="Fund Houses"
          value={stats.amcs}
          icon={<Users size={24} />}
        />
        <DashboardCard
          title="Equity Funds"
          value={stats.equityFunds}
          change={2.5}
          icon={<Activity size={24} />}
        />
        <DashboardCard
          title="Fund Categories"
          value={stats.fundTypes}
          icon={<PieChart size={24} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardChart
          data={stats.chartData}
          title="Market Overview"
        />
        <DashboardChart
          data={stats.chartData.map(d => ({ ...d, value: d.value * 0.8 }))}
          title="Fund Performance"
        />
      </div>
    </div>
  );
}