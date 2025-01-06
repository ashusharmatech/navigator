import React from 'react';
import { TrendingUp } from 'lucide-react';

export const Logo: React.FC = () => (
  <div className="flex items-center space-x-2">
    <TrendingUp className="h-8 w-8 text-blue-600 dark:text-blue-400" />
    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
      NAVigator
    </span>
  </div>
);