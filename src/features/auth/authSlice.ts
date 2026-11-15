import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from './authTypes';
import { authApi } from './services/authApi';
import { tokenManager } from '../../services/api/tokenManager';
import {
  SendOtpRequest,
  VerifyOtpRequest,
  SignupRequest,
  UserProfile,
  VerifyOtpResponse,
} from '../../services/api/apiTypes';
import { OTP_CONFIG } from '../../config/appConstants';
import ENV from '../../config/environment';
import logger from '../../utils/logger';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoadingSession: true,
  isSendingOtp: false,
  isVerifyingOtp: false,
  isSigningUp: false,
  isUpdatingProfile: false,
  activeOtpSession: null,
  status: 'idle',
  error: null,
  isMockMode: Boolean(ENV.USE_MOCK_AUTH && __DEV__),
};

// 1. Session Restoration on App Launch
export const restoreSession = createAsyncThunk(
  'auth/restoreSession',
  async (_, { rejectWithValue }) => {
    try {
      const hasSession = await tokenManager.hasStoredSession();
      if (!hasSession) {
        return null;
      }

      const accessToken = await tokenManager.getAccessToken();
      if (!accessToken) {
        await tokenManager.clearTokens();
        return null;
      }

      // Fetch user profile
      const user = await authApi.getMe();
      return user;
    } catch (error: any) {
      logger.warn('AuthSlice', 'Session restoration failed, clearing session', error);
      await tokenManager.clearTokens();
      return rejectWithValue(error.message || 'Session expired');
    }
  }
);

// 2. Send Mobile OTP
export const sendOtp = createAsyncThunk(
  'auth/sendOtp',
  async (payload: SendOtpRequest, { getState, rejectWithValue }) => {
    const state = (getState() as any).auth as AuthState;
    // Prevent duplicate OTP requests if already in flight or countdown active
    if (state.isSendingOtp) {
      return rejectWithValue('An OTP request is already in progress.');
    }

    try {
      const result = await authApi.sendOtp(payload);
      return {
        ...result,
        mobile: payload.mobile,
        countryCode: payload.countryCode,
        resendAvailableAt: Date.now() + OTP_CONFIG.RESEND_TIMEOUT_SECONDS * 1000,
      };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to send OTP');
    }
  }
);

// 3. Verify OTP
export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async (payload: VerifyOtpRequest, { rejectWithValue }) => {
    try {
      const result = await authApi.verifyOtp(payload);
      // Persist tokens securely
      await tokenManager.saveTokens(
        result.tokens.accessToken,
        result.tokens.refreshToken
      );
      return result;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Invalid OTP code');
    }
  }
);

// 4. Signup & Registration
export const signup = createAsyncThunk(
  'auth/signup',
  async (payload: SignupRequest, { rejectWithValue }) => {
    try {
      const result = await authApi.signup(payload);
      await tokenManager.saveTokens(
        result.tokens.accessToken,
        result.tokens.refreshToken
      );
      return result;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to register account');
    }
  }
);

// 5. Logout
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async () => {
    try {
      await authApi.logout();
    } finally {
      await tokenManager.clearTokens();
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError: state => {
      state.error = null;
    },
    resetOtpSession: state => {
      state.activeOtpSession = null;
    },
    updateUserLocal: (state, action: PayloadAction<Partial<UserProfile>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    setAuthenticatedUser: (state, action: PayloadAction<UserProfile>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: builder => {
    // Session Restoration
    builder
      .addCase(restoreSession.pending, state => {
        state.isLoadingSession = true;
      })
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.isLoadingSession = false;
        if (action.payload) {
          state.user = action.payload;
          state.isAuthenticated = true;
        } else {
          state.user = null;
          state.isAuthenticated = false;
        }
      })
      .addCase(restoreSession.rejected, state => {
        state.isLoadingSession = false;
        state.user = null;
        state.isAuthenticated = false;
      });

    // Send OTP
    builder
      .addCase(sendOtp.pending, state => {
        state.isSendingOtp = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.isSendingOtp = false;
        state.activeOtpSession = {
          mobile: action.payload.mobile,
          countryCode: action.payload.countryCode,
          otpSessionId: action.payload.otpSessionId,
          resendAvailableAt: action.payload.resendAvailableAt,
        };
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.isSendingOtp = false;
        state.error = action.payload as string;
      });

    // Verify OTP
    builder
      .addCase(verifyOtp.pending, state => {
        state.isVerifyingOtp = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action: PayloadAction<VerifyOtpResponse>) => {
        state.isVerifyingOtp = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.activeOtpSession = null;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isVerifyingOtp = false;
        state.error = action.payload as string;
      });

    // Signup
    builder
      .addCase(signup.pending, state => {
        state.isSigningUp = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action: PayloadAction<VerifyOtpResponse>) => {
        state.isSigningUp = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.activeOtpSession = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isSigningUp = false;
        state.error = action.payload as string;
      });

    // Logout
    builder
      .addCase(logoutUser.fulfilled, state => {
        state.user = null;
        state.isAuthenticated = false;
        state.activeOtpSession = null;
        state.error = null;
        state.status = 'idle';
      });
  },
});

export const { clearAuthError, resetOtpSession, updateUserLocal, setAuthenticatedUser } = authSlice.actions;
export default authSlice.reducer;
