import { useEffect, useRef } from 'react';

export function useAdsense() {
  const adRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    try {
      const currentRef = adRef.current;
      if (currentRef && currentRef.innerHTML === '') {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('Error loading ad:', err);
    }
  }, []);

  return adRef;
}