import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { AuthStackParamList } from './navigationTypes';
import { GrowwWelcomeScreen } from '../features/auth/screens/GrowwWelcomeScreen';
import { LoginScreen } from '../features/auth/screens/LoginScreen';
import { EmailPasswordLoginScreen } from '../features/auth/screens/EmailPasswordLoginScreen';
import { AppPinScreen } from '../features/auth/screens/AppPinScreen';
import { SignupScreen } from '../features/auth/screens/SignupScreen';
import { OtpVerificationScreen } from '../features/auth/screens/OtpVerificationScreen';

// KYC & Demat Screens (matching PDF Pages 4-14)
import { PanEntryScreen } from '../features/auth/screens/PanEntryScreen';
import { PanFetchingScreen } from '../features/auth/screens/PanFetchingScreen';
import { PanConfirmScreen } from '../features/auth/screens/PanConfirmScreen';
import { PanFaqScreen } from '../features/auth/screens/PanFaqScreen';
import { PersonalDetailsScreen } from '../features/auth/screens/PersonalDetailsScreen';
import { ConfirmDetailsScreen } from '../features/auth/screens/ConfirmDetailsScreen';
import { SelectBankScreen } from '../features/auth/screens/SelectBankScreen';
import { IfscBranchSearchScreen } from '../features/auth/screens/IfscBranchSearchScreen';
import { BankAccountEntryScreen } from '../features/auth/screens/BankAccountEntryScreen';
import { PennyDropScreen } from '../features/auth/screens/PennyDropScreen';
import { BankFailedScreen } from '../features/auth/screens/BankFailedScreen';
import { BankFaqScreen } from '../features/auth/screens/BankFaqScreen';
import { CameraKycScreen } from '../features/auth/screens/CameraKycScreen';
import { NomineeReviewScreen } from '../features/auth/screens/NomineeReviewScreen';
import { AadhaarFinalStepScreen } from '../features/auth/screens/AadhaarFinalStepScreen';
import { VerifyAadhaarScreen } from '../features/auth/screens/VerifyAadhaarScreen';
import { KycSuccessScreen } from '../features/auth/screens/KycSuccessScreen';
import { OnboardingScreen } from '../features/auth/screens/OnboardingScreen';
import { ProfileSetupScreen } from '../features/auth/screens/ProfileSetupScreen';

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="GrowwWelcome"
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      {/* 1. Auth & App Lock (PDF Pages 1, 2, 3, 17) */}
      <Stack.Screen name="GrowwWelcome" component={GrowwWelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="EmailPasswordLogin" component={EmailPasswordLoginScreen} />
      <Stack.Screen name="AppPin" component={AppPinScreen} />
      <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />

      {/* 2. KYC & Demat Account Opening (PDF Pages 4-14) */}
      <Stack.Screen name="PanEntry" component={PanEntryScreen} />
      <Stack.Screen name="PanFetching" component={PanFetchingScreen} />
      <Stack.Screen name="PanConfirm" component={PanConfirmScreen} />
      <Stack.Screen name="PanFaq" component={PanFaqScreen} />
      <Stack.Screen name="PersonalDetails" component={PersonalDetailsScreen} />
      <Stack.Screen name="ConfirmDetails" component={ConfirmDetailsScreen} />
      <Stack.Screen name="SelectBank" component={SelectBankScreen} />
      <Stack.Screen name="IfscBranchSearch" component={IfscBranchSearchScreen} />
      <Stack.Screen name="BankAccountEntry" component={BankAccountEntryScreen} />
      <Stack.Screen name="PennyDrop" component={PennyDropScreen} />
      <Stack.Screen name="BankFailed" component={BankFailedScreen} />
      <Stack.Screen name="BankFaq" component={BankFaqScreen} />
      <Stack.Screen name="CameraKyc" component={CameraKycScreen} />
      <Stack.Screen name="NomineeReview" component={NomineeReviewScreen} />
      <Stack.Screen name="AadhaarFinalStep" component={AadhaarFinalStepScreen} />
      <Stack.Screen name="VerifyAadhaar" component={VerifyAadhaarScreen} />
      <Stack.Screen name="KycSuccess" component={KycSuccessScreen} />

      {/* Auxiliary screens */}
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
