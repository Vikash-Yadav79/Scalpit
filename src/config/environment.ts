/**
 * Environment configuration for Scalpit mobile app
 */

export interface EnvironmentConfig {
  APP_ENV: 'development' | 'staging' | 'production';
  API_BASE_URL: string;
  API_TIMEOUT_MS: number;
  USE_MOCK_AUTH: boolean;
  ENABLE_DEBUG_LOGS: boolean;
  SUPPORT_EMAIL: string;
}

// Default development configuration with clear mock authentication adapter mode
export const ENV: EnvironmentConfig = {
  APP_ENV: 'development',
  API_BASE_URL: 'https://api.scalpit.io/v1',
  API_TIMEOUT_MS: 15000,
  USE_MOCK_AUTH: true, // Development-only mock adapter for rapid UI testing until backend goes live
  ENABLE_DEBUG_LOGS: __DEV__,
  SUPPORT_EMAIL: 'support@scalpit.io',
};

export default ENV;
