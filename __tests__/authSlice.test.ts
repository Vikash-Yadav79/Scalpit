import authReducer, {
  clearAuthError,
  resetOtpSession,
  updateUserLocal,
} from '../src/features/auth/authSlice';
import { AuthState } from '../src/features/auth/authTypes';

describe('Auth Redux Slice', () => {
  const initialAuthState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoadingSession: true,
    isSendingOtp: false,
    isVerifyingOtp: false,
    isSigningUp: false,
    isUpdatingProfile: false,
    activeOtpSession: null,
    status: 'idle',
    error: 'Initial error',
    isMockMode: true,
  };

  it('clears auth error properly', () => {
    const nextState = authReducer(initialAuthState, clearAuthError());
    expect(nextState.error).toBeNull();
  });

  it('resets OTP session properly', () => {
    const stateWithSession: AuthState = {
      ...initialAuthState,
      activeOtpSession: {
        mobile: '9876543210',
        countryCode: '+91',
        otpSessionId: 'sess_1',
        resendAvailableAt: 1000,
      },
    };

    const nextState = authReducer(stateWithSession, resetOtpSession());
    expect(nextState.activeOtpSession).toBeNull();
  });

  it('updates local user details in store', () => {
    const stateWithUser: AuthState = {
      ...initialAuthState,
      user: {
        id: '1',
        name: 'Initial Name',
        mobile: '9876543210',
        countryCode: '+91',
        isKycVerified: false,
        createdAt: '2026-01-01',
      },
    };

    const nextState = authReducer(
      stateWithUser,
      updateUserLocal({ name: 'Updated Name', isKycVerified: true })
    );

    expect(nextState.user?.name).toBe('Updated Name');
    expect(nextState.user?.isKycVerified).toBe(true);
  });
});
