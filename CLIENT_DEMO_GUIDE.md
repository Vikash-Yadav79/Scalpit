# Client Demo Presentation Guide — Scalpit (Groww-Inspired Mobile Application)

This comprehensive guide is designed for presenting the mobile application to your client or stakeholders. It walks through the complete end-to-end user onboarding, regulatory KYC journey, the 4 main investment tabs, and connected trading/investment workflows.

---

## 📱 Quick App Launch

### Start Metro Bundler:
```bash
cd /Users/hsb/Desktop/mobile-app
npm start
```

### Run on Android (Device or Emulator):
```bash
npm run android
```

### Run on iOS Simulator (macOS):
```bash
npm run ios
```

---

## 🎬 Step-by-Step Demo Script (All 33 PDF Screens Covered)

### **Part 1: Authentication & PIN Security**

#### **Step 1: Splash Screen & Company Identity**
- **What is displayed:**
  - Official Scalpit Company Logo on an obsidian-navy background (`#0B1726`).
  - No awkward text boxes or borders.
  - Emerald `#00D09C` loader with caption: *"Securing investment session..."*.
  - Automatic session check.
- **Client Talking Point:**
  > *"The splash screen seamlessly showcases our Scalpit company identity and initializes secure state in the background before routing."*

#### **Step 2: Welcome Screen**
- **What is displayed:**
  - Scalpit official company logo at the top.
  - Headline: **"Grow your wealth"**
  - Sub-headline: **"Stocks • Mutual Funds • F&O"**
  - 3D Isometric Financial City illustration with floating market indicator orb.
  - Action cards: **"Continue with Google"** (with official Google 'G' logo) and **"Use another email"**.
  - Help link: *"Trouble logging in?"*
  - Legal disclaimer with interactive links: *T&C, Privacy Policy, Tariff Rates, FATCA Declaration & CIBIL T&C*.
- **Action for Demo:**
  - Tap **"Use another email"** (navigates to Email Login) or **"Continue with Google"**.

#### **Step 3: Email & Password Login (PDF Page 1)**
- **What is displayed:**
  - Centered Scalpit logo.
  - Pre-filled email: `poonamsunil1966@gmail.com`.
  - Masked password: `•••••` with toggle eye icon.
  - *"Forgot password?"* link.
  - Primary button: **"Enter"**.
- **Action for Demo:**
  - Tap **"Enter"** to proceed to the App PIN screen.

#### **Step 4: Enter Application PIN (PDF Page 3)**
- **What is displayed:**
  - Scalpit company logo.
  - Headline: **"Enter Groww PIN"** (or Scalpit PIN).
  - Subtitle: *"for Punam Kumari (poonamsunil1966@gmail.com)"*.
  - 4 distinct circular PIN indicators.
  - Full custom on-screen numeric keypad (1 to 9, dot, 0, backspace).
  - Help link: *"Forgot Groww PIN?"*.
- **Action for Demo:**
  - Tap any 4 digits (e.g., `1`, `2`, `3`, `4`). The 4 boxes light up with emerald dots and immediately authenticate.
  - Shortcut link available: *"Switch to KYC Demo"* to explore the Demat opening journey.

---

### **Part 2: Complete KYC & Demat Account Opening (PDF Pages 4–14)**

#### **Step 5: PAN Entry (PDF Page 6)**
- **What is displayed:**
  - Title: **"Enter PAN"**.
  - Input box with pre-filled demo PAN: `BKRYSO108A`.
  - Informative notice: *"As per regulations, PAN is mandatory to invest in India"*.
  - Help shortcut: *"Need help?"* in top header.
- **Action for Demo:**
  - Tap **"Continue"** $\rightarrow$ Triggers live fetching animation.
  - Tap **"Need help?"** to view the Bilingual PAN FAQ (PDF Page 7).

#### **Step 6: PAN Verification Loaders (PDF Pages 4 & 5)**
- **What is displayed:**
  - Screen 1: Pulsing search icon with *"Fetching your PAN details..."*
  - Screen 2: Animated circle with *"Fetching name from Income Tax Department..."*
- **Action for Demo:**
  - Automatically transitions after 1.5 seconds to the PAN Confirmation card.

#### **Step 7: PAN Confirmation Card (PDF Page 8)**
- **What is displayed:**
  - Realistic PAN card mockup with Gov of India emblem.
  - Name: **PUNAM KUMARI** (or logged in user).
  - PAN Number: **BKRYSO108A**.
  - Primary button: **"Confirm as PUNAM KUMARI"**.
  - Secondary button: *"Not you? Re-enter PAN"*.
- **Action for Demo:**
  - Tap **"Confirm as PUNAM KUMARI"**.

#### **Step 8: Personal Details & Trading Experience (PDF Pages 15–16 & Live App)**
- **What is displayed:**
  - Date of Birth, Gender (Male, Female, Other), Marital Status.
  - Occupation & Annual Income selector pills.
  - Father's and Mother's name fields.
  - **Trading Experience (6-Pill Grid)**: `No experience`, `1 year`, `2 years`, `3 years`, `4 years`, `5+ years`.
  - **Segment Checkboxes**: `Cash (equity) / Mutual funds`, `Equity F&O`, `Commodities`, `Debt`.
  - Regulatory declarations (Politically exposed person declaration).
- **Action for Demo:**
  - Tap **"Save and continue"**.

#### **Step 9: Bank Selection (PDF Page 11)**
- **What is displayed:**
  - Title: **"Select your bank"**.
  - Search bar: *"Search by bank name"*.
  - **Top 6 Banks Grid with Logos**:
    - State Bank of India
    - HDFC Bank
    - ICICI Bank
    - Axis Bank
    - Kotak Mahindra Bank
    - Punjab National Bank
  - Alphabetical directory of all Indian scheduled banks.
- **Action for Demo:**
  - Tap **"State Bank of India"**.

#### **Step 10: IFSC Branch Search (PDF Page 9)**
- **What is displayed:**
  - Title: **"Select SBI branch"**.
  - Search bar pre-filled: `sbi`.
  - List of real SBI branches with IFSC codes and city addresses (e.g., *MAIN BRANCH PATNA SBIN0000152*, *KANKARBAGH PATNA SBIN0002957*).
- **Action for Demo:**
  - Tap any branch (e.g. *MAIN BRANCH PATNA*).

#### **Step 11: Bank Account Number Entry (PDF Page 13)**
- **What is displayed:**
  - Selected bank badge: State Bank of India • MAIN BRANCH.
  - Account Number entry field.
  - Confirm Account Number entry field.
  - *"₹1 will be deposited to verify your account"* notice.
- **Action for Demo:**
  - Pre-filled with demo account `38920194821`.
  - Tap **"Verify Bank"**.

#### **Step 12: Penny Drop Verification (PDF Page 12) & Error Handling (PDF Page 10)**
- **What is displayed:**
  - **29-second circular countdown ring** with pulsing animated progress.
  - Message: *"Depositing ₹1 in your bank account..."*.
  - Interactive Demo Mode Switcher:
    - **"Simulate Success"** $\rightarrow$ Green checkmark, account approved!
    - **"Simulate Failure"** $\rightarrow$ Opens **Bank verification failed** (PDF Page 10) with big red circle X and Bank FAQ link (PDF Page 14).
- **Action for Demo:**
  - Tap **"Simulate Success"** to proceed.

#### **Step 13: Live Camera Selfie KYC**
- **What is displayed:**
  - Oval face frame with circular camera shutter.
  - Liveness detection indicator (*"Ensure good lighting and remove glasses"*).
  - Shutter tap captures selfie and performs mock facial match (99.4% match).
- **Action for Demo:**
  - Tap shutter button $\rightarrow$ Advances to Nominee Review.

#### **Step 14: Nominee Review (PDF Pages 22–23)**
- **What is displayed:**
  - Header: Back button, title **"Review nominees"**, *"Skip nominee addition"*.
  - Nominee card: **GHANSHYAM YADAV** (100% share).
  - *"Edit details"* link.
  - `+ Add another nominee` action (supports up to 3 nominees).
- **Action for Demo:**
  - Tap **"Save and continue"**.

#### **Step 15: Aadhaar eSign Final Step (PDF Pages 24–25)**
- **What is displayed:**
  - Screen 1 (PDF Page 25): 3D Podium flag illustration with headline: **"You're just one step away!"**, *"Complete eSign using your Aadhaar to activate your account"*.
  - Screen 2 (PDF Page 24): Realistic **Digio / Account Opening Form (AOF)** document preview with signer name **VIKASH YADAV**, SEBI mandatory schedule table, and eSign checkbox.
- **Action for Demo:**
  - Tap **"Sign Now"** $\rightarrow$ Account activated with official Demat BO ID `12081600-984210`!
  - Tap **"Explore Scalpit"** to enter the main dashboard.

---

### **Part 3: Main Dashboard (4-Tab Bottom Navigation)**

The application follows the official Groww architecture with 4 primary bottom tabs:

```
[ Stocks ]    [ F&O ]    [ Mutual Funds ]    [ Loans ]
```

#### **Tab 1: Stocks (PDF Pages 26, 29, 30)**
- **Explore Sub-Tab (PDF Page 26)**:
  - Top header with Scalpit brand logo, Search icon, and Profile avatar.
  - Market Indices carousel (NIFTY 50 `25,030.35 +2.01%`, SENSEX `81,028.02 +2.17%`, BANK NIFTY `59,086.00`).
  - Muhurat Trading live banner with Diya icon.
  - Gold ETFs banner with 1-tap explore.
  - Popular Bonds list with maturity dates and yields up to 12.20% (Keertana Finserv, Navi Finserv).
  - IPO hub access card.
- **Holdings Sub-Tab (PDF Page 30)**:
  - Category selector: **STOCKS** | **US STOCKS** | **BONDS**.
  - Total Current Value: **₹38,405.00** (Total Returns `+₹1,245.00 (+3.35%)`).
  - List of held securities (Oberoi Realty, Pine Labs, TATAGOLD, ITI) with real-time SVG mini sparklines.
- **Positions Sub-Tab (PDF Page 29)**:
  - Empty positions illustration (telescope).
  - Price movers list (>1% price change) with live gain/loss badges (Varmora Granito, Star Cement).
- **Orders Sub-Tab (PDF Page 29)**:
  - Starry open box empty state with *"You have no open orders today"*.
- **Ankit's Watchlist Sub-Tab (PDF Page 26)**:
  - 11 securities with prices, daily gains, and mini SVG sparklines.
  - Edit watchlist and `+ Add stock` action.
- **All Watchlists Sub-Tab**:
  - Watchlist directory with Pin and unpin functionality.

#### **Tab 2: Futures & Options (F&O) (PDF Pages 27–28)**
- **Explore Sub-Tab**:
  - Muhurat Trading banner with derivatives active timer.
  - Top Traded Derivatives: Equity (`NIFTY 25000 CE`, `BANKNIFTY 59000 PE`) and Commodities (`CRUDEOIL`, `GOLDM`).
  - 1-tap **"Open Option Chain"** launcher.
- **Option Chain Matrix**:
  - NIFTY 50 expiry dates (07 Nov, 14 Nov, 21 Nov, 28 Nov).
  - 3-column financial matrix: **Calls (LTP & OI)** | **Strike Price** | **Puts (LTP & OI)**.
  - Highlighting for In-The-Money (ITM) strikes.
  - Tap any strike to open instant Buy/Sell contract order sheet.

#### **Tab 3: Mutual Funds (PDF Pages 31–33)**
- **Explore Sub-Tab (PDF Page 32)**:
  - Popular Funds grid with 3-year annualised returns (Kotak Silver ETF `+36.22%`, Invesco Mid Cap `+23.72%`, Bandhan Small Cap `+22.90%`, HDFC Flexi Cap `+17.31%`).
  - Curated Collections: High Return, SIP with ₹500, Tax Saving (ELSS), Large Cap, Mid Cap, Small Cap.
- **Dashboard Sub-Tab (PDF Page 33)**:
  - Mutual Funds Portfolio summary: Current **₹1,33,460.00**, Invested **₹1,28,495.00**, Total Returns `+₹4,965.00 (+3.86%)`, XIRR **4.81%**.
  - Fund holdings breakdown with active SIP tags.
- **SIPs Sub-Tab (PDF Page 31)**:
  - Total Monthly SIP: **₹9,600.00**.
  - Active SIPs list (SBI Large Cap ₹5,000, SBI Gold ₹2,000, JioBlackRock ₹1,000, Nippon India ₹500).
  - Calendar due date badges (`16 Nov`, `23 Nov`) and AutoPay mandate indicators.
- **Fund Details & SIP Calculator Screen**:
  - Timeframe performance tabs (1M, 6M, 1Y, 3Y, 5Y, ALL).
  - Interactive SIP vs One-Time calculator with custom amount slider.
  - Top portfolio holdings and fund fundamentals (AUM, Expense Ratio, Exit Load, Benchmark).
  - Sticky bottom CTAs: **"One-Time"** and **"Start SIP"** modal.

#### **Tab 4: Loans (PDF Pages 17–18)**
- **Personal Loan Card (PDF Page 18)**:
  - Sanction limit up to **₹20 Lakhs**.
  - Disbursal in under 2 hours directly to linked bank account.
  - Low interest rates starting at 10.5% p.a.
  - Tap **"Apply for Personal Loan"** $\rightarrow$ Interactive loan amount and tenure selector, live EMI breakdown, and instant in-principle sanction certificate modal!
- **Loan Against Securities (LAS)**:
  - Credit limit up to **₹15 Crores** against stocks and mutual funds without liquidating assets.
- **Interactive EMI Calculator**:
  - Live slider for Loan Amount and Tenure (12 to 60 months).
  - Real-time principal vs total interest calculation.
- **Lending Partners**:
  - RBI-registered NBFC and banking partners (IDFC FIRST Bank, Kisetsu Saison Finance, Aditya Birla Capital).

---

### **Part 4: Connected Modals & Core Flows**

1. **Global Search Modal**:
   - Tap Search icon on any main screen.
   - Live asset filtering across Stocks, F&O, Mutual Funds, and ETFs with recent history.
2. **Stock Details & Buy/Sell Order Modal**:
   - Tap any stock (e.g. Oberoi Realty, Reliance, Tata Motors).
   - Interactive timeframe chart, 52-week high/low range bar, fundamentals.
   - Tap **"BUY"** or **"SELL"** $\rightarrow$ Bottom modal for Delivery/Intraday, Market/Limit order, required margin calculation, and instant order execution receipt!
3. **IPO Hub & UPI Application Modal**:
   - Open, Upcoming, and Closed IPOs list (Swiggy, NTPC Green, Waaree Energies).
   - Subscription timeline and lot size specifications.
   - Retail bid application with lots counter (1 to 13 lots) and UPI mandate ID entry (`@okhdfcbank`, `@oksbi`).
4. **Account & Settings (Profile Modal)**:
   - Tap top-right avatar on any tab.
   - User profile with Demat BO ID, linked bank account, and nominee review.
   - **Centralized Theme Switcher**:
     - ⚫ **Obsidian Dark** (`#0B0E14`) - Groww PDF aesthetic (Default)
     - 🟢 **Emerald Green** (`#00B386`)
     - 🔵 **Fintech Blue** (`#1E40AF`)
   - **Logout Action**: Prompts confirmation and **immediately redirects back to the Login screen**.

---

## 🔑 Key Demo Values Quick Reference

| Feature | Demo Value | Behavior |
| :--- | :--- | :--- |
| **Email Login** | `poonamsunil1966@gmail.com` | Pre-filled matching PDF Page 1 |
| **Password** | `•••••` (99326) | Pre-filled with visibility toggle |
| **App PIN** | `1234` | Any 4 digits unlock PIN screen (PDF Page 3) |
| **PAN Number** | `BKRYSO108A` | Pre-filled matching PDF Page 6 |
| **PAN Verified Name** | `PUNAM KUMARI` | Verified card mockup (PDF Page 8) |
| **Bank Account** | `38920194821` | State Bank of India • MAIN BRANCH PATNA |
| **Penny Drop Timer** | 29 seconds | Animated countdown with Success/Failure toggles |
| **Nominee Name** | `GHANSHYAM YADAV` | 100% share (PDF Pages 22–23) |
| **eSign Signer Name** | `VIKASH YADAV` | Digio Account Opening Form preview (PDF Page 24) |
| **Demat BO ID** | `12081600-984210` | CDSL account activated (PDF Page 25) |
| **Default Theme** | Obsidian Dark | Configurable from Profile (Dark, Green, Blue) |

---

## 🛠️ Verification & Quality Assurance Checklist

All checks pass with 0 errors:

```bash
cd /Users/hsb/Desktop/mobile-app

# 1. Type check (0 errors)
npx tsc --noEmit

# 2. Linter check (0 errors, 0 warnings)
npm run lint

# 3. Unit test suite (16 tests passed)
npm test -- --no-watchman

# 4. Production bundle builds (0 errors)
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output /dev/null
npx react-native bundle --platform ios --dev false --entry-file index.js --bundle-output /dev/null
```
