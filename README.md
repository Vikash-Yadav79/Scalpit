# Scalpit — Premium Investment Mobile Application

Scalpit is a high-performance React Native CLI mobile application inspired by modern investment platforms like Groww. It provides a complete, scalable foundation for direct stock trading, mutual funds, SIPs, IPO tracking, and comprehensive portfolio analytics.

---

## 🌟 Key Features

1. **Centralized Multi-Theme Design System**
   - **Groww Green Theme** (`#00B386`), **Fintech Blue Theme** (`#1E40AF`), and **OLED Dark Theme** (`#111827`).
   - Dynamic `useTheme()` hook with zero hardcoded colors across screens.
   - Central theme registry in `src/theme/`.

2. **Official Scalpit Branding Integration**
   - Brand asset configuration in `src/config/assets.ts`.
   - Official company logo stored at `src/assets/images/company-logo.png`.

3. **Complete Authentication Flow**
   - **Splash Screen**: Session validation & auto-routing.
   - **Onboarding Carousel**: Feature showcase with custom pagination.
   - **Mobile Login**: Country code selection (+91) with 10-digit validation.
   - **Signup Screen**: Full name, mobile, email, and terms & conditions acceptance.
   - **OTP Verification**: 6 individual digit input boxes, 30s resend countdown timer, and duplicate request throttling.
   - **Investor Profile Setup**: SEBI-compliant PAN verification and identity setup.

4. **Security & Session Persistence**
   - Hardware-backed token storage via `react-native-keychain`.
   - Automatic session restoration on app relaunch.
   - Non-sensitive session markers via `@react-native-async-storage/async-storage`.

5. **Groww-Inspired Home Dashboard**
   - **Header**: Official logo, live search, notifications with unread badge, profile avatar.
   - **Market Indices**: NIFTY 50, SENSEX, BANK NIFTY with real-time status and trend badges.
   - **Portfolio Summary**: Total invested, current valuation, total P&L (+/-%), and 1-day returns.
   - **Quick Actions**: Stocks, Mutual Funds, IPO, Watchlist.
   - **Most Active Stocks**: Live stock cards with ticker, company name, price, and daily change.
   - **My Watchlist**: Pinned equities with count badge.
   - **Mutual Funds**: Top direct growth funds with 3Y annualized CAGR and minimum SIP values.
   - **Bottom Navigation**: Home, Stocks, Mutual Funds, Orders, and Profile tabs.

6. **Enterprise API Architecture & Development Mock Mode**
   - Configurable endpoints in `src/services/api/apiEndpoints.ts`.
   - Axios instance with automatic JWT Bearer injection and 401 refresh token retry queue.
   - Built-in **Development Mock Authentication Adapter** allowing full UI and navigation testing prior to backend deployment.
   - Clear banner indicators when running in mock mode.

---

## 📁 Architecture & Folder Structure

```
mobile-app/
├── android/                     # Native Android project (Kotlin, React Native 0.88)
├── ios/                         # Native iOS project (CocoaPods, React Native 0.88)
├── src/
│   ├── assets/
│   │   ├── images/              # Official company-logo.png
│   │   ├── fonts/               # Custom font definitions
│   │   └── icons/
│   ├── components/
│   │   ├── common/              # AppButton, AppText, AppInput, AppHeader, AppLoader, AppModal, etc.
│   │   ├── cards/               # MarketIndexCard, StockCard, MutualFundCard, PortfolioCard
│   │   └── layout/              # ScreenContainer, KeyboardWrapper
│   ├── config/                  # app.config.ts, environment.ts, assets.ts, appConstants.ts
│   ├── theme/                   # Centralized themes (green, blue, dark), typography, spacing, radius, shadows
│   ├── features/
│   │   ├── auth/                # Splash, Onboarding, Login, Signup, OTP, ProfileSetup, authSlice
│   │   ├── home/                # HomeScreen and 9 modular dashboard sections
│   │   ├── stocks/              # Stocks listing screen
│   │   ├── mutualfunds/         # Mutual funds screen
│   │   ├── orders/              # Orders & positions screen
│   │   └── profile/             # Profile & centralized theme switcher screen
│   ├── navigation/              # RootNavigator, AuthNavigator, MainTabNavigator, HomeNavigator
│   ├── services/api/            # axiosInstance, apiEndpoints, apiTypes, apiErrorHandler, tokenManager
│   ├── store/                   # Redux Toolkit store and rootReducer
│   ├── hooks/                   # useTheme, useAppDispatch, useAppSelector
│   ├── utils/                   # validators, formatters, logger
│   └── types/                   # common types
├── .env.example
├── README.md
├── MOBILE_SETUP.md
└── API_INTEGRATION.md
```

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run TypeScript checks
npx tsc --noEmit

# 3. Run ESLint
npm run lint

# 4. Run Jest test suite
npm test -- --no-watchman

# 5. Start Metro
npm start

# 6. Run on Android
npm run android

# 7. Run on iOS (macOS)
npm run ios
```

For complete setup instructions and troubleshooting, refer to [`MOBILE_SETUP.md`](./MOBILE_SETUP.md).
For backend integration and API contracts, refer to [`API_INTEGRATION.md`](./API_INTEGRATION.md).
# Scalpit
