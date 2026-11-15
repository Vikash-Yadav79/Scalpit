# Scalpit Mobile App - Setup & Execution Guide

This document contains step-by-step instructions to set up, build, and run the **Scalpit** React Native CLI mobile application on Android and iOS.

---

## 1. Prerequisites

Ensure your development machine has the following tools installed and configured:

| Tool | Recommended Version | Verification Command |
|---|---|---|
| **Node.js** | `>= 22.11.0` (v24 LTS confirmed) | `node -v` |
| **npm** | `>= 10.x` | `npm -v` |
| **Java JDK** | OpenJDK 17 (Zulu 17 recommended) | `java -version` |
| **Android SDK** | Android 14+ (API 34 / 35), Build Tools | `echo $ANDROID_HOME` |
| **Xcode** (macOS only) | Xcode 15+ / 16+ with Command Line Tools | `xcodebuild -version` |
| **CocoaPods** (macOS only) | `>= 1.14.0` | `pod --version` |

---

## 2. Environment Variables & Android SDK Path

Add the following to your shell profile (`~/.zshrc` or `~/.bash_profile`):

```bash
# Android SDK
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin

# Java Zulu 17
export JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home
export PATH=$PATH:$JAVA_HOME/bin
```

Reload shell configuration:
```bash
source ~/.zshrc
```

---

## 3. Project Installation

From the project root (`mobile-app/`):

```bash
cd mobile-app

# 1. Install npm dependencies
npm install

# 2. Setup iOS CocoaPods (macOS only)
cd ios
pod install
cd ..
```

---

## 4. Running the Application

### Start Metro Bundler
In a dedicated terminal window:
```bash
npm start
```

### Running on Android
1. Launch an Android Emulator via Android Studio (or connect a physical device with USB debugging enabled).
2. Check connected devices:
   ```bash
   adb devices
   ```
3. Run the Android app:
   ```bash
   npm run android
   ```

### Running on iOS (macOS)
1. Open an iOS Simulator or connect your iPhone.
2. Run the iOS app:
   ```bash
   npm run ios
   ```
   *Or open `mobile-app/ios/Scalpit.xcworkspace` in Xcode and click **Run** (Cmd + R).*

---

## 5. Verification Commands

Run the test and verification suite to ensure 100% code quality:

```bash
# TypeScript Type Checking
npx tsc --noEmit

# ESLint Code Quality Inspection
npm run lint

# Jest Unit & Component Tests
npm test -- --no-watchman
```

---

## 6. Development Mock Authentication Mode

Until your Node.js backend goes live, the mobile app includes a built-in **Development Mock Authentication Adapter**:

- **Mock Mobile Number**: Any valid 10-digit number (e.g., `9876543210`)
- **Mock OTP**: `123456`
- **Session Persistence**: Hardware Keystore / Keychain (`react-native-keychain`) with automatic session restoration on app restart.
- To switch to the live backend once available, change `USE_MOCK_AUTH: false` in `src/config/environment.ts` or `.env`.

---

## 7. Troubleshooting

### Android: Gradle Build Cache
If you encounter caching issues with Gradle:
```bash
cd android
./gradlew clean
cd ..
npm run android
```

### iOS: Pod Cache or Prebuilt Download Stalls
If `pod install` stalls downloading prebuilts:
```bash
cd ios
rm -rf Pods Podfile.lock
pod cache clean --all
pod install --repo-update
cd ..
```

### Reset Metro Bundler Cache
```bash
npm start -- --reset-cache
```
