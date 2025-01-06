import { create } from 'zustand';
import { MutualFundScheme } from '../types/mutual-fund';

interface ComparisonState {
  selectedFunds: MutualFundScheme[];
  addFund: (fund: MutualFundScheme) => void;
  removeFund: (schemeCode: number) => void;
  clearFunds: () => void;
}

export const useComparison = create<ComparisonState>((set) => ({
  selectedFunds: [],
  addFund: (fund) => set((state) => {
    if (state.selectedFunds.length >= 3) return state;
    if (state.selectedFunds.some(f => f.schemeCode === fund.schemeCode)) return state;
    return { selectedFunds: [...state.selectedFunds, fund] };
  }),
  removeFund: (schemeCode) => set((state) => ({
    selectedFunds: state.selectedFunds.filter(f => f.schemeCode !== schemeCode)
  })),
  clearFunds: () => set({ selectedFunds: [] })
}));