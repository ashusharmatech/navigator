export interface MutualFundScheme {
  schemeCode: number;
  schemeName: string;
  isinGrowth: string | null;
  isinDivReinvestment: string | null;
}

export interface SchemeMetadata {
  fund_house: string;
  scheme_type: string;
  scheme_category: string;
  scheme_code: number;
  scheme_name: string;
  isin_growth: string | null;
  isin_div_reinvestment: string | null;
}

export interface NAVData {
  date: string;
  nav: string;
}

export interface SchemeDetails {
  meta: SchemeMetadata;
  data: NAVData[];
  status: string;
}