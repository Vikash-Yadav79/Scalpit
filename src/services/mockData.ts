/**
 * Centralized Mock Data Repository for Scalpit (Groww-inspired Investment Platform)
 * Provides realistic market data matching all 33 PDF screenshots.
 */

export interface MarketIndex {
  symbol: string;
  name: string;
  value: number;
  change: number;
  changePercent: number;
  high52w?: number;
  low52w?: number;
}

export interface StockItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  sparkline: number[];
  qty?: number;
  investedPrice?: number;
  category?: 'STOCKS' | 'US STOCKS' | 'BONDS';
}

export interface BondItem {
  id: string;
  name: string;
  maturity: string;
  interestRate: number;
  tenureMonths: number;
  rating: string;
  ratingColor: string;
}

export interface MutualFundItem {
  id: string;
  name: string;
  returns3Y: number;
  category: string;
  currentValue?: number;
  investedValue?: number;
  sipAmount?: number;
  dueDate?: string;
  hasSip?: boolean;
}

export interface OptionContract {
  strike: number;
  callLtp: number;
  callChange: number;
  callOi: string;
  putLtp: number;
  putChange: number;
  putOi: string;
}

export interface IpoItem {
  id: string;
  companyName: string;
  symbol: string;
  priceBand: string;
  lotSize: number;
  issueSize: string;
  status: 'OPEN' | 'UPCOMING' | 'CLOSED';
  dates: string;
  subscriptionTimes?: number;
}

export const mockMarketIndices: MarketIndex[] = [
  { symbol: 'NIFTY', name: 'NIFTY 50', value: 25030.35, change: 493.75, changePercent: 2.01 },
  { symbol: 'SENSEX', name: 'SENSEX', value: 81028.02, change: 1718.01, changePercent: 2.17 },
  { symbol: 'BANKNIFTY', name: 'BANK NIFTY', value: 59086.00, change: 1312.35, changePercent: 2.27 },
  { symbol: 'FINNIFTY', name: 'FINNIFTY', value: 23890.10, change: 345.20, changePercent: 1.47 },
];

export const mockWatchlistStocks: StockItem[] = [
  {
    symbol: 'HINDZINC',
    name: 'Hindustan Zinc',
    price: 568.10,
    change: -2.65,
    changePercent: -0.46,
    sparkline: [572, 570, 569, 567, 568, 566, 568.1],
  },
  {
    symbol: 'MOIL',
    name: 'MOIL',
    price: 215.71,
    change: -0.89,
    changePercent: -0.41,
    sparkline: [218, 217, 216, 215, 216, 215.71],
  },
  {
    symbol: 'OBEROIRLTY',
    name: 'Oberoi Realty',
    price: 1739.00,
    change: -2.20,
    changePercent: -0.13,
    sparkline: [1745, 1742, 1738, 1736, 1737, 1739],
    qty: 7,
  },
  {
    symbol: 'DLF',
    name: 'DLF',
    price: 752.90,
    change: 7.70,
    changePercent: 1.03,
    sparkline: [742, 744, 746, 748, 750, 752.9],
    qty: 3,
  },
  {
    symbol: 'LT',
    name: 'L&T',
    price: 4117.70,
    change: 67.70,
    changePercent: 1.67,
    sparkline: [4040, 4065, 4080, 4095, 4110, 4117.7],
  },
  {
    symbol: 'HDFCBANK',
    name: 'HDFC Bank',
    price: 788.25,
    change: 28.25,
    changePercent: 3.72,
    sparkline: [755, 762, 770, 776, 782, 788.25],
  },
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries',
    price: 2980.50,
    change: 34.10,
    changePercent: 1.16,
    sparkline: [2940, 2955, 2962, 2970, 2980.5],
  },
  {
    symbol: 'TATAMOTORS',
    name: 'Tata Motors',
    price: 942.30,
    change: 18.50,
    changePercent: 2.00,
    sparkline: [920, 926, 931, 938, 942.3],
  },
];

export const mockHoldings: StockItem[] = [
  {
    symbol: 'OBEROIRLTY',
    name: 'Oberoi Realty',
    price: 12173.00,
    change: -2.20,
    changePercent: -0.13,
    sparkline: [12200, 12180, 12150, 12173],
    qty: 7,
    investedPrice: 11625.67,
    category: 'STOCKS',
  },
  {
    symbol: 'PINELABS',
    name: 'Pine Labs',
    price: 10884.15,
    change: 142.00,
    changePercent: 1.32,
    sparkline: [10700, 10760, 10820, 10884.15],
    qty: 67,
    investedPrice: 14807.00,
    category: 'STOCKS',
  },
  {
    symbol: 'TATAGOLD',
    name: 'TATAGOLD',
    price: 6621.12,
    change: -18.20,
    changePercent: -0.27,
    sparkline: [6650, 6640, 6630, 6621.12],
    qty: 484,
    investedPrice: 7080.92,
    category: 'STOCKS',
  },
  {
    symbol: 'ITI',
    name: 'ITI',
    price: 2488.50,
    change: -45.00,
    changePercent: -1.78,
    sparkline: [2550, 2520, 2500, 2488.5],
    qty: 10,
    investedPrice: 3649.50,
    category: 'STOCKS',
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 18450.00,
    change: 320.00,
    changePercent: 1.76,
    sparkline: [18100, 18250, 18350, 18450],
    qty: 2,
    investedPrice: 17200.00,
    category: 'US STOCKS',
  },
  {
    symbol: 'NHAI_BOND',
    name: 'NHAI Tax Free 7.60%',
    price: 10250.00,
    change: 12.00,
    changePercent: 0.12,
    sparkline: [10230, 10240, 10245, 10250],
    qty: 10,
    investedPrice: 10000.00,
    category: 'BONDS',
  },
];

export const mockPopularBonds: BondItem[] = [
  { id: 'b1', name: 'Keertana Finserv Ltd. Dec \'28', maturity: 'Dec \'28', interestRate: 12.20, tenureMonths: 25, rating: 'A-', ratingColor: '#00D09C' },
  { id: 'b2', name: 'Navi Finserv Ltd. May \'28', maturity: 'May \'28', interestRate: 10.10, tenureMonths: 18, rating: 'A+', ratingColor: '#00D09C' },
  { id: 'b3', name: 'Indel Money Ltd. Aug \'28', maturity: 'Aug \'28', interestRate: 10.60, tenureMonths: 21, rating: 'A-', ratingColor: '#00D09C' },
  { id: 'b4', name: 'Muthoot Fincorp Ltd. Sep \'29', maturity: 'Sep \'29', interestRate: 9.10, tenureMonths: 34, rating: 'AA', ratingColor: '#00D09C' },
];

export const mockGoldEtfs = [
  { id: 'g1', name: 'Tata Gold Exchange Traded Fund', price: 13.68, change: -0.21, changePercent: -1.51 },
  { id: 'g2', name: 'Scalpit Gold ETF', price: 13.72, change: -0.24, changePercent: -1.72 },
];

export const mockPriceMovers = [
  { symbol: 'VARMORA', name: 'Varmora Granito', price: 137.65, change: 8.35, changePercent: 6.46 },
  { symbol: 'STARCEMENT', name: 'Star Cement', price: 172.51, change: -7.57, changePercent: -4.20 },
  { symbol: 'DSPPVTBK', name: 'DSP Nifty Private Bank ETF', price: 342.10, change: 4.80, changePercent: 1.42 },
];

export const mockMutualFunds: MutualFundItem[] = [
  { id: 'mf1', name: 'SBI Large Cap Direct Plan Growth', returns3Y: 18.4, category: 'Equity', currentValue: 66967, investedValue: 64997, sipAmount: 5000, dueDate: '16 Nov', hasSip: true },
  { id: 'mf2', name: 'SBI Gold Direct Plan Growth', returns3Y: 14.8, category: 'Commodities', currentValue: 44891, investedValue: 43998, sipAmount: 2000, dueDate: '16 Nov', hasSip: true },
  { id: 'mf3', name: 'JioBlackRock Nifty 50 Index Fund Direct Growth', returns3Y: 16.2, category: 'Index', currentValue: 10440, investedValue: 10000, sipAmount: 1000, dueDate: '16 Nov', hasSip: true },
  { id: 'mf4', name: 'Nippon India Large Cap Fund Direct Growth', returns3Y: 21.5, category: 'Equity', currentValue: 9191, investedValue: 8500, sipAmount: 500, dueDate: '23 Nov', hasSip: true },
  { id: 'mf5', name: 'Kotak Silver ETF FoF Direct-Growth', returns3Y: 36.22, category: 'Commodities' },
  { id: 'mf6', name: 'Invesco India Mid Cap Fund', returns3Y: 23.72, category: 'Mid Cap' },
  { id: 'mf7', name: 'Bandhan Small Cap Fund', returns3Y: 22.90, category: 'Small Cap' },
  { id: 'mf8', name: 'HDFC Flexi Cap Direct Plan-Growth', returns3Y: 17.31, category: 'Flexi Cap' },
  { id: 'mf9', name: 'Axis Silver FoF Direct-Growth', returns3Y: 36.22, category: 'Commodities' },
  { id: 'mf10', name: 'HDFC Defence Fund', returns3Y: 35.52, category: 'Thematic' },
  { id: 'mf11', name: 'HDFC Pharma And Healthcare Fund', returns3Y: 31.24, category: 'Sectoral' },
];

export const mockOptionContracts: OptionContract[] = [
  { strike: 24800, callLtp: 324.50, callChange: 42.10, callOi: '42.8 L', putLtp: 45.20, putChange: -28.40, putOi: '78.4 L' },
  { strike: 24900, callLtp: 248.10, callChange: 38.40, callOi: '56.2 L', putLtp: 68.90, putChange: -24.10, putOi: '89.1 L' },
  { strike: 25000, callLtp: 178.60, callChange: 31.20, callOi: '98.4 L', putLtp: 98.40, putChange: -18.20, putOi: '112.5 L' },
  { strike: 25100, callLtp: 118.25, callChange: 22.80, callOi: '124.6 L', putLtp: 142.10, putChange: -12.40, putOi: '64.8 L' },
  { strike: 25200, callLtp: 74.30, callChange: 15.10, callOi: '84.2 L', putLtp: 198.50, putChange: -8.10, putOi: '42.1 L' },
  { strike: 25300, callLtp: 42.10, callChange: 8.40, callOi: '62.1 L', putLtp: 268.40, putChange: -4.50, putOi: '28.9 L' },
];

export const mockIpos: IpoItem[] = [
  { id: 'ipo1', companyName: 'Swiggy Limited', symbol: 'SWIGGY', priceBand: '₹371 - ₹390', lotSize: 38, issueSize: '₹11,327 Cr', status: 'OPEN', dates: '6 Nov - 8 Nov', subscriptionTimes: 3.59 },
  { id: 'ipo2', companyName: 'NTPC Green Energy Ltd', symbol: 'NTPCGREEN', priceBand: '₹102 - ₹108', lotSize: 138, issueSize: '₹10,000 Cr', status: 'UPCOMING', dates: '19 Nov - 22 Nov' },
  { id: 'ipo3', companyName: 'Waaree Energies Ltd', symbol: 'WAAREE', priceBand: '₹1427 - ₹1503', lotSize: 9, issueSize: '₹4,321 Cr', status: 'CLOSED', dates: '21 Oct - 23 Oct', subscriptionTimes: 76.34 },
];
