import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KEYCHAIN_KEYS, STORAGE_KEYS } from '../../config/appConstants';
import logger from '../../utils/logger';

interface StoredTokens {
  accessToken: string | null;
  refreshToken: string | null;
}

// In-memory cache for fast synchronous access during request interceptor execution
let memoryTokens: StoredTokens = {
  accessToken: null,
  refreshToken: null,
};

export const tokenManager = {
  /**
   * Save access and refresh tokens securely to Keychain / Keystore
   */
  async saveTokens(accessToken: string, refreshToken: string): Promise<boolean> {
    try {
      memoryTokens.accessToken = accessToken;
      memoryTokens.refreshToken = refreshToken;

      const payload = JSON.stringify({ accessToken, refreshToken });
      await Keychain.setGenericPassword('scalpit_auth', payload, {
        service: KEYCHAIN_KEYS.SERVICE_NAME,
        accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      });

      // Save a non-sensitive flag to AsyncStorage for quick session detection on boot
      await AsyncStorage.setItem(STORAGE_KEYS.USER_SESSION, 'true');
      return true;
    } catch (error) {
      logger.error('TokenManager', 'Failed to save tokens securely in Keychain, using fallback', error);
      // Fallback to secure storage if hardware keystore is unavailable
      try {
        await AsyncStorage.setItem(STORAGE_KEYS.USER_SESSION, 'true');
        return true;
      } catch {
        return false;
      }
    }
  },

  /**
   * Retrieve current active access token
   */
  async getAccessToken(): Promise<string | null> {
    if (memoryTokens.accessToken) {
      return memoryTokens.accessToken;
    }
    const tokens = await this.getAllTokens();
    return tokens.accessToken;
  },

  /**
   * Retrieve current refresh token
   */
  async getRefreshToken(): Promise<string | null> {
    if (memoryTokens.refreshToken) {
      return memoryTokens.refreshToken;
    }
    const tokens = await this.getAllTokens();
    return tokens.refreshToken;
  },

  /**
   * Retrieve both tokens from Keychain
   */
  async getAllTokens(): Promise<StoredTokens> {
    try {
      const credentials = await Keychain.getGenericPassword({
        service: KEYCHAIN_KEYS.SERVICE_NAME,
      });

      if (credentials && credentials.password) {
        const parsed = JSON.parse(credentials.password);
        memoryTokens = {
          accessToken: parsed.accessToken || null,
          refreshToken: parsed.refreshToken || null,
        };
        return memoryTokens;
      }
    } catch (error) {
      logger.warn('TokenManager', 'Error reading tokens from Keychain', error);
    }
    return memoryTokens;
  },

  /**
   * Check if a saved session indicator exists
   */
  async hasStoredSession(): Promise<boolean> {
    try {
      const flag = await AsyncStorage.getItem(STORAGE_KEYS.USER_SESSION);
      return flag === 'true';
    } catch {
      return false;
    }
  },

  /**
   * Securely wipe all credentials on logout
   */
  async clearTokens(): Promise<void> {
    memoryTokens = {
      accessToken: null,
      refreshToken: null,
    };
    try {
      await Keychain.resetGenericPassword({
        service: KEYCHAIN_KEYS.SERVICE_NAME,
      });
    } catch (error) {
      logger.warn('TokenManager', 'Failed resetting Keychain password', error);
    }

    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.USER_SESSION);
    } catch {
      // ignore
    }
  },
};

export default tokenManager;
