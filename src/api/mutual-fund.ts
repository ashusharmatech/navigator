import axios from 'axios';
import { MutualFundScheme, SchemeDetails } from '../types/mutual-fund';

const BASE_URL = 'https://api.mfapi.in/mf';

// Create axios instance with caching interceptor
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

const cache = new Map();

axiosInstance.interceptors.request.use(
  async config => {
    const key = config.url;
    if (key && cache.has(key)) {
      const cachedData = cache.get(key);
      const now = Date.now();
      if (now - cachedData.timestamp < 5 * 60 * 1000) { // 5 minutes cache
        return Promise.reject({
          config,
          response: { data: cachedData.data, status: 304 }
        });
      }
    }
    return config;
  }
);

axiosInstance.interceptors.response.use(
  response => {
    const key = response.config.url;
    if (key) {
      cache.set(key, {
        data: response.data,
        timestamp: Date.now()
      });
    }
    return response;
  }
);

export const api = {
  async getAllSchemes(): Promise<MutualFundScheme[]> {
    try {
      const response = await axiosInstance.get('');
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 304) {
        return error.response.data;
      }
      console.error('Error fetching schemes:', error);
      throw error;
    }
  },

  async getLatestNAV(schemeCode: number): Promise<SchemeDetails> {
    try {
      const response = await axiosInstance.get(`/${schemeCode}/latest`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 304) {
        return error.response.data;
      }
      console.error('Error fetching latest NAV:', error);
      throw error;
    }
  },

  async getHistoricalNAV(schemeCode: number): Promise<SchemeDetails> {
    try {
      const response = await axiosInstance.get(`/${schemeCode}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 304) {
        return error.response.data;
      }
      console.error('Error fetching historical NAV:', error);
      throw error;
    }
  },
};