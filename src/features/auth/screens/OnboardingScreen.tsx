import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../../../hooks/useTheme';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { AppText } from '../../../components/common/AppText';
import { AppButton } from '../../../components/common/AppButton';
import { AppIcon, IconName } from '../../../components/common/AppIcon';
import assets from '../../../config/assets';
import { AuthStackParamList } from '../../../navigation/navigationTypes';

type OnboardingNavProp = StackNavigationProp<AuthStackParamList, 'Onboarding'>;

interface Slide {
  id: string;
  icon: IconName;
  title: string;
  subtitle: string;
}

const slides: Slide[] = [
  {
    id: '1',
    icon: 'stocks',
    title: 'Zero Brokerage on Direct Stocks',
    subtitle: 'Trade NSE & BSE listed equities with ultra-low latency execution and real-time quotes.',
  },
  {
    id: '2',
    icon: 'mutual-funds',
    title: 'Direct Mutual Funds & SIPs',
    subtitle: 'Earn up to 1.5% extra returns by investing directly in zero-commission mutual fund schemes.',
  },
  {
    id: '3',
    icon: 'shield',
    title: 'SEBI Regulated & Bank-Grade Security',
    subtitle: 'Your investments and funds are safeguarded with state-of-the-art encryption.',
  },
];

export const OnboardingScreen: React.FC = () => {
  const { colors, spacing, radius } = useTheme();
  const navigation = useNavigation<OnboardingNavProp>();
  const [activeIndex, setActiveIndex] = useState(0);

  const currentSlide = slides[activeIndex];

  const handleNext = () => {
    if (activeIndex < slides.length - 1) {
      setActiveIndex(prev => prev + 1);
    } else {
      navigation.navigate('Signup');
    }
  };

  return (
    <ScreenContainer>
      <View style={[styles.container, { padding: spacing.xl }]}>
        {/* Header Branding */}
        <View style={styles.topBranding}>
          <Image
            source={assets.brand.logo}
            style={[styles.logo, { borderRadius: radius.md }]}
            resizeMode="contain"
          />
          <AppText
            variant="h2"
            color="textPrimary"
            style={[styles.brandTitle, { marginLeft: spacing.sm }]}
          >
            {assets.brand.name}
          </AppText>
        </View>

        {/* Feature Visual & Card */}
        <View style={styles.centerCard}>
          <View
            style={[
              styles.iconWrapper,
              {
                backgroundColor: colors.primarySoft,
                borderRadius: radius.xxl,
                marginBottom: spacing.xl,
              },
            ]}
          >
            <AppIcon
              name={currentSlide.icon}
              size={54}
              color={colors.primary}
              strokeWidth={2}
            />
          </View>

          <AppText
            variant="h1"
            color="textPrimary"
            align="center"
            style={{ fontWeight: '800', marginBottom: spacing.sm }}
          >
            {currentSlide.title}
          </AppText>

          <AppText
            variant="body"
            color="textSecondary"
            align="center"
            style={{ lineHeight: 22, paddingHorizontal: spacing.md }}
          >
            {currentSlide.subtitle}
          </AppText>

          {/* Dots Indicator */}
          <View style={[styles.dotsRow, { marginTop: spacing.xl }]}>
            {slides.map((_, index) => {
              const isActive = index === activeIndex;
              return (
                <TouchableOpacity
                  key={`dot-${index}`}
                  onPress={() => setActiveIndex(index)}
                  style={[
                    styles.dot,
                    {
                      width: isActive ? 24 : 8,
                      backgroundColor: isActive ? colors.primary : colors.border,
                      borderRadius: radius.xs,
                      marginHorizontal: 4,
                    },
                  ]}
                />
              );
            })}
          </View>
        </View>

        {/* Bottom Actions */}
        <View style={styles.bottomSection}>
          <AppButton
            title={activeIndex === slides.length - 1 ? 'Get Started' : 'Next'}
            onPress={handleNext}
            variant="primary"
            size="lg"
            style={{ marginBottom: spacing.md }}
          />

          <AppButton
            title="Already have an account? Log in"
            onPress={() => navigation.navigate('Login')}
            variant="ghost"
            size="md"
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topBranding: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 38,
    height: 38,
  },
  brandTitle: {
    fontWeight: '800',
  },
  centerCard: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  iconWrapper: {
    width: 108,
    height: 108,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    height: 8,
  },
  bottomSection: {
    width: '100%',
  },
});

export default OnboardingScreen;
