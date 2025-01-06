import { NAVData } from '../types/mutual-fund';
import { parse, differenceInDays } from 'date-fns';

export const calculateStats = (navData: NAVData[]) => {
  if (!navData || navData.length === 0) {
    return {
      high: 0,
      low: 0,
      cagr: 0
    };
  }

  const values = navData.map(item => parseFloat(item.nav));
  const high = Math.max(...values);
  const low = Math.min(...values);

  // Calculate CAGR only if we have at least 2 data points
  if (navData.length < 2) {
    return { high, low, cagr: 0 };
  }

  try {
    const firstDate = parse(navData[navData.length - 1].date, 'dd-MM-yyyy', new Date());
    const lastDate = parse(navData[0].date, 'dd-MM-yyyy', new Date());
    const days = differenceInDays(lastDate, firstDate);
    
    // Return 0 CAGR if the time period is too short
    if (days < 1) {
      return { high, low, cagr: 0 };
    }

    const years = days / 365;
    const firstNAV = parseFloat(navData[navData.length - 1].nav);
    const lastNAV = parseFloat(navData[0].nav);
    
    const cagr = ((Math.pow(lastNAV / firstNAV, 1 / years) - 1) * 100);
    
    return { 
      high, 
      low, 
      cagr: isFinite(cagr) ? cagr : 0 
    };
  } catch (error) {
    console.error('Error calculating CAGR:', error);
    return { high, low, cagr: 0 };
  }
};

export const filterDataByRange = (navData: NAVData[], range: string): NAVData[] => {
  if (!navData || navData.length === 0) {
    return [];
  }

  const today = new Date();
  let filterDate = new Date();

  switch (range) {
    case '1M':
      filterDate.setMonth(today.getMonth() - 1);
      break;
    case '6M':
      filterDate.setMonth(today.getMonth() - 6);
      break;
    case '1Y':
      filterDate.setFullYear(today.getFullYear() - 1);
      break;
    case '3Y':
      filterDate.setFullYear(today.getFullYear() - 3);
      break;
    case '5Y':
      filterDate.setFullYear(today.getFullYear() - 5);
      break;
    default: // Max
      return navData;
  }

  return navData.filter(item => {
    try {
      const itemDate = parse(item.date, 'dd-MM-yyyy', new Date());
      return itemDate >= filterDate;
    } catch (error) {
      console.error('Error parsing date:', error);
      return false;
    }
  });
};