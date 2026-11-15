# Scalpit - Backend API Integration Architecture

This document defines the API contracts, endpoint conventions, authentication handshake, and data transfer objects (DTOs) required to connect the Node.js backend to the Scalpit React Native mobile application.

---

## 1. Architecture Overview

- **Base URL**: Configured centrally in `src/config/environment.ts` (`API_BASE_URL`).
- **HTTP Client**: `axiosInstance` (`src/services/api/axiosInstance.ts`) with request and response interceptors.
- **Authentication**: JWT Bearer token authentication (`Authorization: Bearer <accessToken>`).
- **Token Storage**: Hardware Keychain / Keystore via `react-native-keychain`.
- **Automatic Token Refresh**: The response interceptor transparently intercepts `401 Unauthorized`, invokes `/auth/refresh-token`, updates hardware storage, and retries queued requests without user disruption.

---

## 2. API Endpoints Required

All endpoints are centralized in [`src/services/api/apiEndpoints.ts`](./src/services/api/apiEndpoints.ts).

### 2.1 Authentication Endpoints

#### 1. Request OTP
- **Route**: `POST /auth/send-otp`
- **Request Body**:
```json
{
  "mobile": "9876543210",
  "countryCode": "+91"
}
```
- **Success Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "otpSessionId": "sess_891230491823",
    "maskedMobile": "98******10",
    "expiresInSeconds": 30
  }
}
```

---

#### 2. Verify OTP & Establish Session
- **Route**: `POST /auth/verify-otp`
- **Request Body**:
```json
{
  "mobile": "9876543210",
  "countryCode": "+91",
  "otp": "123456",
  "otpSessionId": "sess_891230491823"
}
```
- **Success Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "isNewUser": false,
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
      "refreshToken": "d8a1c9e8-4b72-4d2a-89a1...",
      "expiresIn": 3600
    },
    "user": {
      "id": "usr_99812",
      "name": "Rahul Sharma",
      "mobile": "9876543210",
      "countryCode": "+91",
      "email": "rahul.sharma@example.com",
      "panNumber": "ABCDE1234F",
      "isKycVerified": true,
      "createdAt": "2026-01-15T10:00:00Z"
    }
  }
}
```

---

#### 3. Signup & Account Registration
- **Route**: `POST /auth/signup`
- **Request Body**:
```json
{
  "name": "Aarav Patel",
  "mobile": "9812345678",
  "countryCode": "+91",
  "email": "aarav.patel@example.com",
  "termsAccepted": true
}
```
- **Success Response (201 Created)**:
```json
{
  "success": true,
  "data": {
    "isNewUser": true,
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
      "refreshToken": "f12e89d1-3341-45da-98cd...",
      "expiresIn": 3600
    },
    "user": {
      "id": "usr_100234",
      "name": "Aarav Patel",
      "mobile": "9812345678",
      "countryCode": "+91",
      "email": "aarav.patel@example.com",
      "isKycVerified": false,
      "createdAt": "2026-11-06T09:00:00Z"
    }
  }
}
```

---

#### 4. Refresh Access Token
- **Route**: `POST /auth/refresh-token`
- **Request Body**:
```json
{
  "refreshToken": "d8a1c9e8-4b72-4d2a-89a1..."
}
```
- **Success Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
    "refreshToken": "d8a1c9e8-4b72-4d2a-89a1...",
    "expiresIn": 3600
  }
}
```

---

#### 5. Fetch Active User Profile
- **Route**: `GET /auth/me`
- **Headers**: `Authorization: Bearer <accessToken>`
- **Success Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "id": "usr_99812",
    "name": "Rahul Sharma",
    "mobile": "9876543210",
    "countryCode": "+91",
    "email": "rahul.sharma@example.com",
    "panNumber": "ABCDE1234F",
    "isKycVerified": true,
    "createdAt": "2026-01-15T10:00:00Z"
  }
}
```

---

#### 6. Logout
- **Route**: `POST /auth/logout`
- **Headers**: `Authorization: Bearer <accessToken>`
- **Success Response (200 OK)**:
```json
{
  "success": true,
  "message": "Session terminated successfully."
}
```

---

### 2.2 Market & Portfolio Endpoints

| Endpoint | Method | Purpose |
|---|---|---|
| `/market/indices` | `GET` | Fetches NIFTY 50, SENSEX, BANK NIFTY, points, daily +/- and market status |
| `/stocks/popular` | `GET` | Retrieves most active and high-volume stocks with price and 1-day return |
| `/mutual-funds/popular` | `GET` | Top-rated mutual fund schemes with 3Y CAGR and minimum SIP |
| `/portfolio/summary` | `GET` | Total investment, current market value, total returns, and 1-day P&L |
| `/watchlist` | `GET` | Current user's pinned watchlist stocks |

---

## 3. Switching from Mock Adapter to Live Backend

1. Open `src/config/environment.ts` (or update your `.env` file):
```typescript
export const ENV: EnvironmentConfig = {
  APP_ENV: 'development',
  API_BASE_URL: 'http://<YOUR_LOCAL_IP>:5000/api/v1', // Or your staging server URL
  API_TIMEOUT_MS: 15000,
  USE_MOCK_AUTH: false, // Set to false to invoke real backend API endpoints
  ENABLE_DEBUG_LOGS: __DEV__,
  SUPPORT_EMAIL: 'support@scalpit.io',
};
```
2. Restart Metro bundler:
```bash
npm start -- --reset-cache
```
