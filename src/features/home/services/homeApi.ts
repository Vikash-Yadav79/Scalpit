import { MarketIndexData } from '../../../components/cards/MarketIndexCard';
import { StockData } from '../../../components/cards/StockCard';
import { MutualFundData } from '../../../components/cards/MutualFundCard';
import { PortfolioSummaryData } from '../../../components/cards/PortfolioCard';

/**
 * HOME API SERVICE & REALISTIC SAMPLE DATA FOR DEVELOPMENT
 *
 * NOTE: Prices and percentage changes are realistic sample market figures
 * for development UI presentation until live broker websockets/REST are connected.
 */

export interface HomeDashboardData {
  indices: MarketIndexData[];
  portfolio: PortfolioSummaryData;
  quickActions: Array<{
    id: string;
    title: string;
    icon: any;
    badge?: string;
  }>;
  popularStocks: StockData[];
  watchlist: StockData[];
  topMovers: StockData[];
  mutualFunds: MutualFundData[];
}

export const sampleDashboardData: HomeDashboardData = {
  indices: [
    {
      id: 'nifty-50',
      name: 'NIFTY 50',
      value: 24367.9,
      change: 142.3,
      changePercent: 0.59,
      isOpen: true,
    },
    {
      id: 'sensex',
      name: 'SENSEX',
      value: 80116.45,
      change: 486.2,
      changePercent: 0.61,
      isOpen: true,
    },
    {
      id: 'bank-nifty',
      name: 'BANK NIFTY',
      value: 51980.1,
      change: -98.45,
      changePercent: -0.19,
      isOpen: true,
    },
    {
      id: 'nifty-it',
      name: 'NIFTY IT',
      value: 41850.3,
      change: 320.15,
      changePercent: 0.77,
      isOpen: true,
    },
  ],
  portfolio: {
    totalInvested: 245000.0,
    currentValue: 278650.5,
    totalReturns: 33650.5,
    totalReturnsPercent: 13.73,
    oneDayReturns: 1845.2,
    oneDayReturnsPercent: 0.67,
  },
  quickActions: [
    { id: 'stocks', title: 'Stocks', icon: 'stocks' },
    { id: 'mutual-funds', title: 'Mutual Funds', icon: 'mutual-funds' },
    { id: 'ipo', title: 'IPO', icon: 'activity', badge: '3 Open' },
    { id: 'watchlist', title: 'Watchlist', icon: 'star' },
  ],
  popularStocks: [
    {
      id: 'reliance',
      symbol: 'RELIANCE',
      companyName: 'Reliance Industries Ltd.',
      price: 2984.4,
      change: 34.6,
      changePercent: 1.17,
      marketCap: 'Large Cap',
    },
    {
      id: 'tcs',
      symbol: 'TCS',
      companyName: 'Tata Consultancy Services Ltd.',
      price: 4125.8,
      change: -18.25,
      changePercent: -0.44,
      marketCap: 'Large Cap',
    },
    {
      id: 'hdfcbank',
      symbol: 'HDFCBANK',
      companyName: 'HDFC Bank Ltd.',
      price: 1682.1,
      change: 12.4,
      changePercent: 0.74,
      marketCap: 'Large Cap',
    },
    {
      id: 'infy',
      symbol: 'INFY',
      companyName: 'Infosys Ltd.',
      price: 1876.5,
      change: 22.8,
      changePercent: 1.23,
      marketCap: 'Large Cap',
    },
    {
      id: 'icicibank',
      symbol: 'ICICIBANK',
      companyName: 'ICICI Bank Ltd.',
      price: 1245.9,
      change: -4.3,
      changePercent: -0.34,
      marketCap: 'Large Cap',
    },
    {
      id: 'tata-motors',
      symbol: 'TATAMOTORS',
      companyName: 'Tata Motors Ltd.',
      price: 984.7,
      change: 28.1,
      changePercent: 2.94,
      marketCap: 'Large Cap',
    },
  ],
  watchlist: [
    {
      id: 'zomato',
      symbol: 'ZOMATO',
      companyName: 'Zomato Ltd.',
      price: 274.5,
      change: 8.4,
      changePercent: 3.16,
    },
    {
      id: 'jiofin',
      symbol: 'JIOFIN',
      companyName: 'Jio Financial Services Ltd.',
      price: 342.15,
      change: 5.75,
      changePercent: 1.71,
    },
    {
      id: 'hal',
      symbol: 'HAL',
      companyName: 'Hindustan Aeronautics Ltd.',
      price: 4620.0,
      change: -45.5,
      changePercent: -0.97,
    },
  ],
  topMovers: [
    {
      id: 'suzlon',
      symbol: 'SUZLON',
      companyName: 'Suzlon Energy Ltd.',
      price: 74.2,
      change: 3.5,
      changePercent: 4.95,
    },
    {
      id: 'bhel',
      symbol: 'BHEL',
      companyName: 'Bharat Heavy Electricals Ltd.',
      price: 312.4,
      change: 12.8,
      changePercent: 4.27,
    },
  ],
  mutualFunds: [
    {
      id: 'parag-parikh',
      name: 'Parag Parikh Flexi Cap Fund Direct-Growth',
      category: 'Flexi Cap',
      cagr3y: 22.4,
      rating: 5,
      minSip: 1000,
    },
    {
      id: 'quant-small-cap',
      name: 'Quant Small Cap Fund Direct-Growth',
      category: 'Small Cap',
      cagr3y: 31.8,
      rating: 5,
      minSip: 1000,
    },
    {
      id: 'mirae-asset-large-cap',
      name: 'Mirae Asset Large Cap Fund Direct-Growth',
      category: 'Large Cap',
      cagr3y: 16.5,
      rating: 4,
      minSip: 500,
    },
  ],
};

export const homeApi = {
  fetchDashboardData: async (): Promise<HomeDashboardData> => {
    // In production, this calls axiosInstance.get(API_ENDPOINTS.HOME.DASHBOARD)
    await new Promise<void>(resolve => setTimeout(() => resolve(), 300));
    return sampleDashboardData;
  },
};

export default homeApi;
