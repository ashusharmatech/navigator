import React from 'react';
import { useAdsense } from '../hooks/useAdsense';
import { ADSENSE_CONFIG } from '../config/adsense';

interface AdProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  className?: string;
}

export const Advertisement: React.FC<AdProps> = ({ 
  slot, 
  format = 'auto',
  className = '' 
}) => {
  const adRef = useAdsense();

  return (
    <div className={`ad-container my-4 ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CONFIG.client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}