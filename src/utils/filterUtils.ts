import { MutualFundScheme } from '../types/mutual-fund';

// Cache for parsed scheme details
const schemeDetailsCache = new Map<string, {
  amc: string;
  planType: string;
  dividendOption: string;
  fundType: string;
}>();

export const parseSchemeDetails = (schemeName: string) => {
  if (schemeDetailsCache.has(schemeName)) {
    return schemeDetailsCache.get(schemeName)!;
  }

  const details = {
    amc: extractAMC(schemeName),
    planType: extractPlanType(schemeName),
    dividendOption: extractDividendOption(schemeName),
    fundType: extractFundType(schemeName)
  };

  schemeDetailsCache.set(schemeName, details);
  return details;
};

export const extractAMC = (schemeName: string): string => {
  return schemeName.split(' ')[0];
};

export const extractPlanType = (schemeName: string): string => {
  if (schemeName.includes('Direct Plan')) return 'Direct Plan';
  if (schemeName.includes('Regular Plan')) return 'Regular Plan';
  return 'Unknown Plan';
};

export const extractDividendOption = (schemeName: string): string => {
  if (schemeName.includes('Daily IDCW')) return 'Daily IDCW';
  if (schemeName.includes('Weekly IDCW')) return 'Weekly IDCW';
  if (schemeName.includes('Growth')) return 'Growth';
  if (schemeName.includes('Dividend')) return 'Dividend';
  return 'Unknown Option';
};

export const extractFundType = (schemeName: string): string => {
  const commonFundTypes = [
    'Liquid Fund',
    'Treasury Advantage Fund',
    'Equity Fund',
    'Debt Fund',
    'Hybrid Fund',
    'Index Fund',
    'Money Market Fund',
  ];

  for (const type of commonFundTypes) {
    if (schemeName.includes(type)) return type;
  }
  return 'Other';
};

export const getUniqueValues = (schemes: MutualFundScheme[], extractor: (name: string) => string): string[] => {
  const valuesSet = new Set<string>();
  
  for (const scheme of schemes) {
    const value = extractor(scheme.schemeName);
    if (value) valuesSet.add(value);
  }
  
  return Array.from(valuesSet).sort();
};