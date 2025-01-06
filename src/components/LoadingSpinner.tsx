import React from 'react';
import { TrendingUp } from 'lucide-react';

interface LoadingSpinnerProps {
  message: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message }) => (
  <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
    <div className="text-center">
      <div className="inline-block animate-bounce mb-4">
        <TrendingUp className="h-12 w-12 text-blue-600 dark:text-blue-400" />
      </div>
      <p className="text-gray-900 dark:text-white">{message}</p>
    </div>
  </div>
);