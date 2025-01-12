import React from 'react';
import { Advertisement } from './Advertisement';

interface AdPlacementProps {
  position: 'top' | 'sidebar' | 'content';
  className?: string;
}

export const AdPlacement: React.FC<AdPlacementProps> = ({ position, className = '' }) => {
  const slots = {
    top: 'top-ad-slot',
    sidebar: 'sidebar-ad-slot',
    content: 'content-ad-slot'
  };

  return (
    <div className={`ad-container ${className}`}>
      <Advertisement slot={slots[position]} format="auto" />
    </div>
  );
}