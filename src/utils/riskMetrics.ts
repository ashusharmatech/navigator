import { NAVData } from '../types/mutual-fund';
import { parse } from 'date-fns';

const RISK_FREE_RATE = 0.05; // 5% annual risk-free rate
const MARKET_RETURN = 0.10; // 10% annual market return

export interface RiskMetrics {
  beta: number;
  sharpeRatio: number;
  standardDeviation: number;
  alpha: number;
  rSquared: number;
}

export const calculateRiskMetrics = (navData: NAVData[]): RiskMetrics => {
  if (!navData || navData.length < 2) {
    return {
      beta: 0,
      sharpeRatio: 0,
      standardDeviation: 0,
      alpha: 0,
      rSquared: 0
    };
  }

  // Calculate daily returns
  const returns: number[] = [];
  for (let i = 1; i < navData.length; i++) {
    const currentNAV = parseFloat(navData[i].nav);
    const previousNAV = parseFloat(navData[i - 1].nav);
    const dailyReturn = (currentNAV - previousNAV) / previousNAV;
    returns.push(dailyReturn);
  }

  // Calculate standard deviation
  const avgReturn = returns.reduce((a, b) => a + b, 0) / returns.length;
  const squaredDiffs = returns.map(r => Math.pow(r - avgReturn, 2));
  const standardDeviation = Math.sqrt(squaredDiffs.reduce((a, b) => a + b, 0) / returns.length);

  // Annualize standard deviation
  const annualizedStdDev = standardDeviation * Math.sqrt(252); // 252 trading days

  // Calculate beta (using simplified market comparison)
  const marketReturns = returns.map(() => MARKET_RETURN / 252); // Daily market returns
  const covariance = calculateCovariance(returns, marketReturns);
  const marketVariance = calculateVariance(marketReturns);
  const beta = covariance / marketVariance;

  // Calculate Sharpe Ratio
  const annualizedReturn = (Math.pow(1 + avgReturn, 252) - 1);
  const sharpeRatio = (annualizedReturn - RISK_FREE_RATE) / annualizedStdDev;

  // Calculate Alpha
  const alpha = annualizedReturn - (RISK_FREE_RATE + beta * (MARKET_RETURN - RISK_FREE_RATE));

  // Calculate R-squared
  const rSquared = Math.pow(calculateCorrelation(returns, marketReturns), 2);

  return {
    beta: Number(beta.toFixed(2)),
    sharpeRatio: Number(sharpeRatio.toFixed(2)),
    standardDeviation: Number(annualizedStdDev.toFixed(2)),
    alpha: Number(alpha.toFixed(2)),
    rSquared: Number(rSquared.toFixed(2))
  };
};

const calculateCovariance = (array1: number[], array2: number[]): number => {
  const mean1 = array1.reduce((a, b) => a + b, 0) / array1.length;
  const mean2 = array2.reduce((a, b) => a + b, 0) / array2.length;
  const products = array1.map((x, i) => (x - mean1) * (array2[i] - mean2));
  return products.reduce((a, b) => a + b, 0) / array1.length;
};

const calculateVariance = (array: number[]): number => {
  const mean = array.reduce((a, b) => a + b, 0) / array.length;
  const squaredDiffs = array.map(x => Math.pow(x - mean, 2));
  return squaredDiffs.reduce((a, b) => a + b, 0) / array.length;
};

const calculateCorrelation = (array1: number[], array2: number[]): number => {
  const covariance = calculateCovariance(array1, array2);
  const stdDev1 = Math.sqrt(calculateVariance(array1));
  const stdDev2 = Math.sqrt(calculateVariance(array2));
  return covariance / (stdDev1 * stdDev2);
};