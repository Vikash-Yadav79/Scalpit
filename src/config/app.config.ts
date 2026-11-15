import ENV from './environment';

export const appConfig = {
  appName: 'Scalpit',
  version: '1.0.0',
  buildNumber: '1',
  bundleId: 'com.scalpit.app',
  env: ENV.APP_ENV,
  apiUrl: ENV.API_BASE_URL,
  apiTimeout: ENV.API_TIMEOUT_MS,
  mockMode: ENV.USE_MOCK_AUTH,
  features: {
    darkThemeEnabled: true,
    biometricsEnabled: true,
    socialLoginEnabled: false,
    mockMarketData: true,
  },
};

export default appConfig;
