import React from 'react';

interface TimeRangeSelectorProps {
  selectedRange: string;
  onRangeChange: (range: string) => void;
}

export const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
  selectedRange,
  onRangeChange,
}) => {
  const ranges = ['1M', '6M', '1Y', '3Y', '5Y', 'Max'];

  return (
    <div className="flex space-x-2 mb-6">
      {ranges.map((range) => (
        <button
          key={range}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
            ${
              selectedRange === range
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          onClick={() => onRangeChange(range)}
        >
          {range}
        </button>
      ))}
    </div>
  );
};