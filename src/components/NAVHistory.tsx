import React, { useState, useMemo } from 'react';
import { NAVData } from '../types/mutual-fund';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { format, parse } from 'date-fns';
import { TimeRangeSelector } from './TimeRangeSelector';
import { NAVStats } from './NAVStats';
import { filterDataByRange } from '../utils/navCalculations';

interface NAVHistoryProps {
  navData: NAVData[];
}

export const NAVHistory: React.FC<NAVHistoryProps> = ({ navData }) => {
  const [selectedRange, setSelectedRange] = useState('1Y');
  
  const { chartData, isPositive } = useMemo(() => {
    const filteredData = filterDataByRange(navData, selectedRange);
    const data = filteredData.map(item => ({
      date: parse(item.date, 'dd-MM-yyyy', new Date()),
      nav: parseFloat(item.nav)
    })).reverse();

    const isPositive = data.length >= 2 && data[data.length - 1].nav >= data[0].nav;
    
    return { chartData: data, isPositive };
  }, [navData, selectedRange]);

  const chartColor = isPositive ? '#22c55e' : '#ef4444';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Price Chart</h2>
      
      <NAVStats navData={filterDataByRange(navData, selectedRange)} />
      <TimeRangeSelector
        selectedRange={selectedRange}
        onRangeChange={setSelectedRange}
      />
      
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="navGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColor} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={chartColor} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="date"
              tickFormatter={(date) => format(date, 'MMM dd')}
              stroke="#9CA3AF"
            />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              labelFormatter={(date) => format(date, 'MMM dd, yyyy')}
              formatter={(value: number) => [`₹${value.toFixed(2)}`, 'NAV']}
              contentStyle={{
                backgroundColor: 'rgb(31, 41, 55)',
                border: 'none',
                borderRadius: '0.375rem',
                color: '#fff'
              }}
            />
            <Area
              type="monotone"
              dataKey="nav"
              stroke={chartColor}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#navGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};