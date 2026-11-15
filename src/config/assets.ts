import { ImageSourcePropType } from 'react-native';

/**
 * Centralized Brand Asset Management
 */

let logoSource: ImageSourcePropType;
let growwWelcomeSource: ImageSourcePropType;
let growwAccountFormSource: ImageSourcePropType;
let growwFlagPodiumSource: ImageSourcePropType;

try {
  logoSource = require('../assets/images/company-logo.png');
} catch {
  logoSource = { uri: 'https://placehold.co/400x400/00B386/ffffff.png?text=SCALPIT' };
}

try {
  growwWelcomeSource = require('../assets/images/groww_welcome.jpg');
} catch {
  growwWelcomeSource = logoSource;
}

try {
  growwAccountFormSource = require('../assets/images/groww_account_form.jpg');
} catch {
  growwAccountFormSource = logoSource;
}

try {
  growwFlagPodiumSource = require('../assets/images/groww_flag_podium.jpg');
} catch {
  growwFlagPodiumSource = logoSource;
}

export const assets = {
  brand: {
    name: 'Scalpit',
    tagline: 'Stocks • Mutual Funds • F&O',
    logo: logoSource,
    splashLogo: logoSource,
    appIcon: logoSource,
  },
  illustrations: {
    welcome: growwWelcomeSource,
    accountForm: growwAccountFormSource,
    flagPodium: growwFlagPodiumSource,
    emptyPortfolio: logoSource,
  },
};

export default assets;
