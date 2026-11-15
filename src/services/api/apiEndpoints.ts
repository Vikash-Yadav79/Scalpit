/**
 * Centralized API Endpoint Registry
 * All endpoint paths are configurable from this single file.
 */

export const API_ENDPOINTS = {
  AUTH: {
    SEND_OTP: '/auth/send-otp',
    VERIFY_OTP: '/auth/verify-otp',
    SIGNUP: '/auth/signup',
    REFRESH_TOKEN: '/auth/refresh-token',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    UPDATE_PROFILE: '/auth/profile',
  },
  MARKET: {
    INDICES: '/market/indices',
    INDEX_DETAILS: (indexId: string) => `/market/indices/${indexId}`,
    STATUS: '/market/status',
  },
  STOCKS: {
    POPULAR: '/stocks/popular',
    TOP_MOVERS: '/stocks/top-movers',
    DETAILS: (symbol: string) => `/stocks/${symbol}`,
    SEARCH: '/stocks/search',
  },
  MUTUAL_FUNDS: {
    POPULAR: '/mutual-funds/popular',
    CATEGORIES: '/mutual-funds/categories',
    DETAILS: (fundId: string) => `/mutual-funds/${fundId}`,
  },
  PORTFOLIO: {
    SUMMARY: '/portfolio/summary',
    HOLDINGS: '/portfolio/holdings',
    ORDERS: '/portfolio/orders',
  },
  WATCHLIST: {
    GET_USER_WATCHLIST: '/watchlist',
    ADD_ITEM: '/watchlist/items',
    REMOVE_ITEM: (id: string) => `/watchlist/items/${id}`,
  },
} as const;

export default API_ENDPOINTS;
