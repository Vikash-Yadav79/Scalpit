import axiosInstance from '../../../services/api/axiosInstance';
import { API_ENDPOINTS } from '../../../services/api/apiEndpoints';
import {
  SendOtpRequest,
  SendOtpResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
  SignupRequest,
  UserProfile,
  UpdateProfileRequest,
  ApiResponse,
} from '../../../services/api/apiTypes';
import ENV from '../../../config/environment';
import logger from '../../../utils/logger';
import { normalizeApiError } from '../../../services/api/apiErrorHandler';

/**
 * DEVELOPMENT MOCK AUTHENTICATION ADAPTER
 * Allows full UI and navigation testing of the login, signup, OTP, and session flows
 * while the Node.js backend development is in progress separately.
 *
 * NOTE: Mock authentication is ONLY active when ENV.USE_MOCK_AUTH === true and __DEV__.
 */
const mockAuthAdapter = {
  sendOtp: async (req: SendOtpRequest): Promise<SendOtpResponse> => {
    logger.warn('MockAuthAdapter', 'USING MOCK AUTH ADAPTER: OTP generated for testing is: 123456');
    await new Promise<void>(resolve => setTimeout(() => resolve(), 800)); // Simulate realistic network delay
    return {
      otpSessionId: `mock_sess_${Date.now()}`,
      maskedMobile: `${req.mobile.slice(0, 2)}******${req.mobile.slice(-2)}`,
      expiresInSeconds: 30,
    };
  },

  verifyOtp: async (req: VerifyOtpRequest): Promise<VerifyOtpResponse> => {
    logger.warn('MockAuthAdapter', 'USING MOCK AUTH ADAPTER: Verifying OTP');
    await new Promise<void>(resolve => setTimeout(() => resolve(), 900));

    if (req.otp !== '123456' && req.otp !== '000000') {
      throw new Error('Invalid OTP. Use test OTP: 123456');
    }

    const isExistingUser = req.mobile === '9876543210';

    return {
      isNewUser: !isExistingUser,
      tokens: {
        accessToken: `mock_jwt_access_${Date.now()}`,
        refreshToken: `mock_jwt_refresh_${Date.now()}`,
        expiresIn: 3600,
      },
      user: {
        id: 'usr_mock_101',
        name: isExistingUser ? 'Rahul Sharma' : 'New Investor',
        mobile: req.mobile,
        countryCode: req.countryCode || '+91',
        email: 'rahul.sharma@example.com',
        panNumber: 'ABCDE1234F',
        isKycVerified: true,
        createdAt: new Date().toISOString(),
      },
    };
  },

  signup: async (req: SignupRequest): Promise<VerifyOtpResponse> => {
    logger.warn('MockAuthAdapter', 'USING MOCK AUTH ADAPTER: Registering new profile');
    await new Promise<void>(resolve => setTimeout(() => resolve(), 1000));

    return {
      isNewUser: false,
      tokens: {
        accessToken: `mock_jwt_access_${Date.now()}`,
        refreshToken: `mock_jwt_refresh_${Date.now()}`,
        expiresIn: 3600,
      },
      user: {
        id: `usr_${Date.now()}`,
        name: req.name,
        mobile: req.mobile,
        countryCode: req.countryCode,
        email: req.email,
        isKycVerified: false,
        createdAt: new Date().toISOString(),
      },
    };
  },

  fetchCurrentUser: async (): Promise<UserProfile> => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
    return {
      id: 'usr_mock_101',
      name: 'Rahul Sharma',
      mobile: '9876543210',
      countryCode: '+91',
      email: 'rahul.sharma@example.com',
      panNumber: 'ABCDE1234F',
      isKycVerified: true,
      createdAt: new Date().toISOString(),
    };
  },
};

/**
 * Centralized Auth API Service
 */
export const authApi = {
  /**
   * Request OTP for mobile authentication
   */
  async sendOtp(payload: SendOtpRequest): Promise<SendOtpResponse> {
    if (ENV.USE_MOCK_AUTH && __DEV__) {
      return mockAuthAdapter.sendOtp(payload);
    }

    try {
      const response = await axiosInstance.post<ApiResponse<SendOtpResponse>>(
        API_ENDPOINTS.AUTH.SEND_OTP,
        payload
      );
      return response.data.data;
    } catch (error) {
      if (__DEV__ && ENV.USE_MOCK_AUTH) {
        logger.warn('AuthApi', 'Backend unavailable, falling back to mock adapter');
        return mockAuthAdapter.sendOtp(payload);
      }
      const err = normalizeApiError(error);
      throw new Error(err.message);
    }
  },

  /**
   * Verify received OTP and establish session
   */
  async verifyOtp(payload: VerifyOtpRequest): Promise<VerifyOtpResponse> {
    if (ENV.USE_MOCK_AUTH && __DEV__) {
      return mockAuthAdapter.verifyOtp(payload);
    }

    try {
      const response = await axiosInstance.post<ApiResponse<VerifyOtpResponse>>(
        API_ENDPOINTS.AUTH.VERIFY_OTP,
        payload
      );
      return response.data.data;
    } catch (error) {
      if (__DEV__ && ENV.USE_MOCK_AUTH) {
        logger.warn('AuthApi', 'Backend unavailable, falling back to mock adapter');
        return mockAuthAdapter.verifyOtp(payload);
      }
      const err = normalizeApiError(error);
      throw new Error(err.message);
    }
  },

  /**
   * Register a new user account
   */
  async signup(payload: SignupRequest): Promise<VerifyOtpResponse> {
    if (ENV.USE_MOCK_AUTH && __DEV__) {
      return mockAuthAdapter.signup(payload);
    }

    try {
      const response = await axiosInstance.post<ApiResponse<VerifyOtpResponse>>(
        API_ENDPOINTS.AUTH.SIGNUP,
        payload
      );
      return response.data.data;
    } catch (error) {
      if (__DEV__ && ENV.USE_MOCK_AUTH) {
        return mockAuthAdapter.signup(payload);
      }
      const err = normalizeApiError(error);
      throw new Error(err.message);
    }
  },

  /**
   * Restore profile from active session token
   */
  async getMe(): Promise<UserProfile> {
    if (ENV.USE_MOCK_AUTH && __DEV__) {
      return mockAuthAdapter.fetchCurrentUser();
    }

    try {
      const response = await axiosInstance.get<ApiResponse<UserProfile>>(
        API_ENDPOINTS.AUTH.ME
      );
      return response.data.data;
    } catch (error) {
      if (__DEV__ && ENV.USE_MOCK_AUTH) {
        return mockAuthAdapter.fetchCurrentUser();
      }
      const err = normalizeApiError(error);
      throw new Error(err.message);
    }
  },

  /**
   * Update profile details (e.g. KYC, PAN, Email)
   */
  async updateProfile(payload: UpdateProfileRequest): Promise<UserProfile> {
    try {
      const response = await axiosInstance.put<ApiResponse<UserProfile>>(
        API_ENDPOINTS.AUTH.UPDATE_PROFILE,
        payload
      );
      return response.data.data;
    } catch (error) {
      const err = normalizeApiError(error);
      throw new Error(err.message);
    }
  },

  /**
   * Inform backend of logout
   */
  async logout(): Promise<void> {
    try {
      await axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch {
      // Ignore network errors on logout to allow clean local teardown
    }
  },
};

export default authApi;
