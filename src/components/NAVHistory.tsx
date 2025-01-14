import React, { useState, useMemo, memo, useRef, forwardRef } from 'react';
import { NAVData } from '../types/mutual-fund';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
  Brush
} from 'recharts';
import { format, parse } from 'date-fns';
import { TimeRangeSelector } from './TimeRangeSelector';
import { NAVStats } from './NAVStats';
import { filterDataByRange } from '../utils/navCalculations';
import { ZoomIn, ZoomOut, Move } from 'lucide-react';

interface NAVHistoryProps {
  navData: NAVData[];
}

interface ChartProps {
  data: any[];
  chartColor: string;
  zoomData: any;
  isPanning: boolean;
  onMouseDown: (e: any) => void;
  onMouseMove: (e: any) => void;
  onMouseUp: () => void;
}

const Chart = forwardRef<any, ChartProps>(({
  data,
  chartColor,
  zoomData,
  isPanning,
  onMouseDown,
  onMouseMove,
  onMouseUp
}, ref) => (
  <ResponsiveContainer width="100%" height="100%">
    <AreaChart
      data={data}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      ref={ref}
    >
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
        allowDataOverflow
      />
      <YAxis 
        stroke="#9CA3AF"
        domain={['auto', 'auto']}
        allowDataOverflow
      />
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
        isAnimationActive={false}
      />
      {zoomData && (
        <ReferenceArea
          x1={zoomData.x1}
          x2={zoomData.x2}
          strokeOpacity={0.3}
          fill="#8884d8"
          fillOpacity={0.1}
        />
      )}
      <Brush
        dataKey="date"
        height={30}
        stroke={chartColor}
        tickFormatter={(date) => format(date, 'MMM yyyy')}
      />
    </AreaChart>
  </ResponsiveContainer>
));

Chart.displayName = 'Chart';

const MemoizedChart = memo(Chart);

export const NAVHistory = memo(({ navData }: NAVHistoryProps) => {
  const [selectedRange, setSelectedRange] = useState('1Y');
  const [zoomData, setZoomData] = useState<any>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState<any>(null);
  const [chartDomain, setChartDomain] = useState<[number, number] | null>(null);
  const chartRef = useRef<any>(null);
  
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

  const handleZoom = (direction: 'in' | 'out') => {
    if (!chartDomain && chartData.length > 0) {
      const start = chartData[0].date.getTime();
      const end = chartData[chartData.length - 1].date.getTime();
      setChartDomain([start, end]);
      return;
    }

    if (!chartDomain) return;

    const [start, end] = chartDomain;
    const range = end - start;
    const midPoint = (start + end) / 2;

    if (direction === 'in') {
      const newRange = range * 0.5;
      setChartDomain([
        midPoint - newRange / 2,
        midPoint + newRange / 2
      ]);
    } else {
      const newRange = range * 2;
      setChartDomain([
        Math.max(midPoint - newRange / 2, chartData[0].date.getTime()),
        Math.min(midPoint + newRange / 2, chartData[chartData.length - 1].date.getTime())
      ]);
    }
  };

  const handleMouseDown = (e: any) => {
    if (!e) return;
    const { chartX } = e;
    if (isPanning) {
      setPanStart({ x: chartX });
    } else {
      setZoomData({ x1: e.activeLabel, x2: e.activeLabel });
    }
  };

  const handleMouseMove = (e: any) => {
    if (!e) return;
    if (isPanning && panStart) {
      const { chartX } = e;
      const diff = panStart.x - chartX;
      if (chartDomain) {
        const [start, end] = chartDomain;
        setChartDomain([start + diff, end + diff]);
      }
      setPanStart({ x: chartX });
    } else if (zoomData) {
      setZoomData({ ...zoomData, x2: e.activeLabel });
    }
  };

  const handleMouseUp = () => {
    if (zoomData && !isPanning) {
      const { x1, x2 } = zoomData;
      if (x1 && x2) {
        const [min, max] = [x1, x2].sort((a, b) => a - b);
        setChartDomain([min, max]);
      }
    }
    setZoomData(null);
    setPanStart(null);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Price Chart</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsPanning(!isPanning)}
            className={`p-2 rounded-lg transition-colors ${
              isPanning
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            title={isPanning ? 'Pan Mode' : 'Zoom Mode'}
          >
            <Move size={20} />
          </button>
          <button
            onClick={() => handleZoom('in')}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-400 
              hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="Zoom In"
          >
            <ZoomIn size={20} />
          </button>
          <button
            onClick={() => handleZoom('out')}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-400 
              hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut size={20} />
          </button>
        </div>
      </div>
      
      <NAVStats navData={filterDataByRange(navData, selectedRange)} />
      <TimeRangeSelector
        selectedRange={selectedRange}
        onRangeChange={setSelectedRange}
      />
      
      <div className="h-[400px]">
        <MemoizedChart
          ref={chartRef}
          data={chartData}
          chartColor={chartColor}
          zoomData={zoomData}
          isPanning={isPanning}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        />
      </div>
    </div>
  );
});