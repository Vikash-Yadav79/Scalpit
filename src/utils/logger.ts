import ENV from '../config/environment';

/**
 * Sanitized development logger.
 * Never outputs sensitive tokens, passwords, or PII.
 */
export const logger = {
  info: (tag: string, message: string, data?: any) => {
    if (ENV.ENABLE_DEBUG_LOGS) {
      console.log(`[INFO][${tag}] ${message}`, data ? sanitize(data) : '');
    }
  },
  warn: (tag: string, message: string, data?: any) => {
    if (ENV.ENABLE_DEBUG_LOGS) {
      console.warn(`[WARN][${tag}] ${message}`, data ? sanitize(data) : '');
    }
  },
  error: (tag: string, message: string, error?: any) => {
    if (ENV.ENABLE_DEBUG_LOGS) {
      console.error(`[ERROR][${tag}] ${message}`, error ? sanitize(error) : '');
    }
  },
};

function sanitize(obj: any): any {
  if (!obj || typeof obj !== 'object') return obj;
  const clone = Array.isArray(obj) ? [...obj] : { ...obj };
  const sensitiveKeys = ['password', 'token', 'accessToken', 'refreshToken', 'pin', 'otp', 'pan'];

  for (const key of Object.keys(clone)) {
    if (sensitiveKeys.some(s => key.toLowerCase().includes(s))) {
      clone[key] = '***REDACTED***';
    } else if (typeof clone[key] === 'object') {
      clone[key] = sanitize(clone[key]);
    }
  }
  return clone;
}

export default logger;
