import { UserProfile } from '../../services/api/apiTypes';
import { AsyncStatus } from '../../types/common';

export interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoadingSession: boolean;
  isSendingOtp: boolean;
  isVerifyingOtp: boolean;
  isSigningUp: boolean;
  isUpdatingProfile: boolean;
  activeOtpSession: {
    mobile: string;
    countryCode: string;
    otpSessionId: string;
    resendAvailableAt: number; // timestamp in ms
  } | null;
  status: AsyncStatus;
  error: string | null;
  isMockMode: boolean;
}
