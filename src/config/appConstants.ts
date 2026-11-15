export const STORAGE_KEYS = {
  USER_SESSION: '@scalpit_user_session',
  THEME_PREFERENCE: '@scalpit_theme_pref',
  ONBOARDING_COMPLETED: '@scalpit_onboarding_done',
  WATCHLIST_CACHE: '@scalpit_watchlist_cache',
  USER_SETTINGS: '@scalpit_user_settings',
} as const;

export const KEYCHAIN_KEYS = {
  SERVICE_NAME: 'com.scalpit.app.auth',
  ACCESS_TOKEN: 'scalpit_access_token',
  REFRESH_TOKEN: 'scalpit_refresh_token',
} as const;

export const OTP_CONFIG = {
  LENGTH: 6,
  RESEND_TIMEOUT_SECONDS: 30,
  MAX_ATTEMPTS: 3,
} as const;

export const MARKET_STATUS = {
  OPEN: 'OPEN',
  CLOSED: 'CLOSED',
  PRE_OPEN: 'PRE_OPEN',
} as const;
