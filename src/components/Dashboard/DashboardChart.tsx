import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

interface DashboardChartProps {
  data: Array<{ date: Date; value: number }>;
  title: string;
}

export const DashboardChart: React.FC<DashboardChartProps> = ({ data, title }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">{title}</h3>
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
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
            contentStyle={{
              backgroundColor: 'rgb(31, 41, 55)',
              border: 'none',
              borderRadius: '0.375rem',
              color: '#fff'
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#3B82F6"
            fillOpacity={1}
            fill="url(#colorValue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);