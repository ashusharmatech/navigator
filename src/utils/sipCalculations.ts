import { NAVData } from '../types/mutual-fund';
import { parse, differenceInMonths, differenceInWeeks, isAfter, isBefore } from 'date-fns';

interface SIPResult {
  totalInvestment: number;
  currentValue: number;
  returns: number;
  xirr: number;
  installments: number;
}

export const calculateSIP = (
  navData: NAVData[],
  amount: number,
  frequency: 'monthly' | 'weekly',
  startDate: Date
): SIPResult => {
  // Sort NAV data by date in ascending order
  const sortedData = [...navData].sort((a, b) => {
    const dateA = parse(a.date, 'dd-MM-yyyy', new Date());
    const dateB = parse(b.date, 'dd-MM-yyyy', new Date());
    return dateA.getTime() - dateB.getTime();
  });

  // Initialize variables
  let totalUnits = 0;
  let totalInvestment = 0;
  let installments = 0;
  const cashflows: { date: Date; amount: number }[] = [];

  // Get start and end dates
  const firstNavDate = parse(sortedData[0].date, 'dd-MM-yyyy', new Date());
  const endDate = parse(sortedData[sortedData.length - 1].date, 'dd-MM-yyyy', new Date());

  // Adjust start date if it's before first NAV date
  if (isBefore(startDate, firstNavDate)) {
    startDate = firstNavDate;
  }

  // Get investment dates based on frequency
  const investmentDates: Date[] = [];
  let currentDate = startDate;
  while (!isAfter(currentDate, endDate)) {
    investmentDates.push(currentDate);
    if (frequency === 'monthly') {
      currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
    } else {
      currentDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    }
  }

  // Process each investment
  for (const investmentDate of investmentDates) {
    // Find the NAV entry for this date or the next available date
    const navEntry = sortedData.find(entry => {
      const entryDate = parse(entry.date, 'dd-MM-yyyy', new Date());
      return !isBefore(entryDate, investmentDate);
    });

    if (navEntry) {
      const nav = parseFloat(navEntry.nav);
      if (!isNaN(nav) && nav > 0) {
        const units = amount / nav;
        totalUnits += units;
        totalInvestment += amount;
        installments++;
        
        const navDate = parse(navEntry.date, 'dd-MM-yyyy', new Date());
        cashflows.push({ date: navDate, amount: -amount });
      }
    }
  }

  // Calculate final value using latest NAV
  const lastNAV = parseFloat(sortedData[sortedData.length - 1].nav);
  const currentValue = totalUnits * lastNAV;
  const returns = currentValue - totalInvestment;

  // Add final cashflow for XIRR calculation
  if (currentValue > 0) {
    cashflows.push({ date: endDate, amount: currentValue });
  }

  // Calculate XIRR
  const xirr = calculateXIRR(cashflows);

  return {
    totalInvestment,
    currentValue,
    returns,
    xirr,
    installments
  };
};

const calculateXIRR = (cashflows: { date: Date; amount: number }[]): number => {
  if (cashflows.length < 2) return 0;

  const guess = 0.1;
  const maxIterations = 100;
  const tolerance = 0.0000001;

  const getDaysDiff = (date1: Date, date2: Date) => {
    return (date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24);
  };

  const firstDate = cashflows[0].date;

  const f = (rate: number) => {
    return cashflows.reduce((sum, cf) => {
      const daysDiff = getDaysDiff(firstDate, cf.date);
      return sum + cf.amount / Math.pow(1 + rate, daysDiff / 365);
    }, 0);
  };

  let rate = guess;
  let previousRate = 0;
  let iteration = 0;

  while (iteration < maxIterations) {
    const value = f(rate);
    if (Math.abs(value) < tolerance) {
      return rate * 100; // Convert to percentage
    }

    // Secant method for better convergence
    const df = (f(rate + tolerance) - value) / tolerance;
    previousRate = rate;
    rate = rate - value / df;

    if (Math.abs(rate - previousRate) < tolerance) {
      return rate * 100; // Convert to percentage
    }

    if (isNaN(rate) || !isFinite(rate)) {
      return 0;
    }

    iteration++;
  }

  return 0;
};