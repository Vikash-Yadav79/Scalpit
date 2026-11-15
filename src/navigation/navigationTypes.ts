import { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  GrowwWelcome: undefined;
  Onboarding: undefined;
  Login: undefined;
  EmailPasswordLogin: undefined;
  AppPin: {
    userName?: string;
    targetRoute?: string;
  };
  Signup: undefined;
  OtpVerification: {
    mobile?: string;
    email?: string;
    countryCode?: string;
    isSignup?: boolean;
    name?: string;
  };
  // KYC & Demat Flow (matching PDF Pages 4-14)
  PanEntry: undefined;
  PanFetching: {
    panNumber: string;
  };
  PanConfirm: {
    panNumber: string;
    name: string;
  };
  PanFaq: undefined;
  PersonalDetails: undefined;
  ConfirmDetails: {
    panNumber?: string;
    name?: string;
  };
  SelectBank: {
    userName?: string;
  };
  IfscBranchSearch: {
    bankName: string;
  };
  BankAccountEntry: {
    bankName: string;
    branch: string;
    ifsc: string;
  };
  PennyDrop: {
    bankName: string;
    accountNo: string;
  };
  BankFailed: undefined;
  BankFaq: undefined;
  CameraKyc: undefined;
  NomineeReview: undefined;
  AadhaarFinalStep: undefined;
  VerifyAadhaar: undefined;
  KycSuccess: undefined;
  ProfileSetup: undefined;
};

export type MainTabParamList = {
  StocksTab: undefined;
  FnoTab: undefined;
  MutualFundsTab: undefined;
  LoansTab: undefined;
};

export type RootStackParamList = {
  Splash: undefined;
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
  // Global Modals / Screen Stacks
  StockDetails: {
    symbol: string;
    name: string;
    price: number;
    change?: number;
    changePercent?: number;
  };
  StockBuySell: {
    symbol: string;
    name: string;
    price: number;
    action: 'BUY' | 'SELL';
  };
  OptionChain: {
    indexName?: string;
  };
  FundDetails: {
    fundId: string;
    name: string;
  };
  FundSipInvest: {
    fundId: string;
    name: string;
  };
  IpoHub: undefined;
  IpoDetails: {
    ipoId: string;
    companyName: string;
  };
  ApplyIpo: {
    ipoId: string;
    companyName: string;
    priceBand: string;
  };
  PersonalLoanApply: undefined;
  ProfileModal: undefined;
  SearchModal: undefined;
};
