/**
 * Centralized API Request & Response Types
 */

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data: T;
  meta?: {
    timestamp: string;
    version?: string;
  };
}

// Authentication DTOs
export interface SendOtpRequest {
  mobile: string;
  countryCode: string;
}

export interface SendOtpResponse {
  otpSessionId: string;
  maskedMobile: string;
  expiresInSeconds: number;
}

export interface VerifyOtpRequest {
  mobile: string;
  countryCode: string;
  otp: string;
  otpSessionId?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface UserProfile {
  id: string;
  name: string;
  mobile: string;
  countryCode: string;
  email?: string;
  panNumber?: string;
  isKycVerified: boolean;
  avatarUrl?: string;
  createdAt: string;
}

export interface VerifyOtpResponse {
  isNewUser: boolean;
  tokens: AuthTokens;
  user: UserProfile;
}

export interface SignupRequest {
  name: string;
  mobile: string;
  countryCode: string;
  email?: string;
  termsAccepted: boolean;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
}

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
  panNumber?: string;
}
