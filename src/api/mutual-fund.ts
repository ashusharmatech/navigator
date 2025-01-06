import axios from 'axios';
import { MutualFundScheme, SchemeDetails } from '../types/mutual-fund';

const BASE_URL = 'https://api.mfapi.in/mf';

export const api = {
  async getAllSchemes(): Promise<MutualFundScheme[]> {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching schemes:', error);
      throw error;
    }
  },

  async getLatestNAV(schemeCode: number): Promise<SchemeDetails> {
    try {
      const response = await axios.get(`${BASE_URL}/${schemeCode}/latest`);
      return response.data;
    } catch (error) {
      console.error('Error fetching latest NAV:', error);
      throw error;
    }
  },

  async getHistoricalNAV(schemeCode: number): Promise<SchemeDetails> {
    try {
      const response = await axios.get(`${BASE_URL}/${schemeCode}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching historical NAV:', error);
      throw error;
    }
  },
};