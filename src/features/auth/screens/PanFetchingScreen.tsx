import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../../../hooks/useTheme';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { AppText } from '../../../components/common/AppText';
import { AppIcon } from '../../../components/common/AppIcon';
import { AuthStackParamList } from '../../../navigation/navigationTypes';

type PanFetchingNavProp = StackNavigationProp<AuthStackParamList, 'PanFetching'>;
type PanFetchingRouteProp = RouteProp<AuthStackParamList, 'PanFetching'>;

export const PanFetchingScreen: React.FC = () => {
  const { colors, spacing } = useTheme();
  const navigation = useNavigation<PanFetchingNavProp>();
  const route = useRoute<PanFetchingRouteProp>();

  const panNumber = route.params?.panNumber || 'BKRYSO108A';
  const [step, setStep] = useState<1 | 2>(1);

  useEffect(() => {
    // Step 1: Fetching your name as on PAN (PDF Page 4)
    const t1 = setTimeout(() => {
      setStep(2); // Step 2: Fetching your PAN details (PDF Page 5)
    }, 1200);

    // Transition to PanConfirm (PDF Page 8)
    const t2 = setTimeout(() => {
      navigation.replace('PanConfirm', {
        panNumber,
        name: 'PUNAM KUMARI',
      });
    }, 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [navigation, panNumber]);

  return (
    <ScreenContainer>
      <View style={styles.container}>
        {/* Center Isometric Verification Animation */}
        <View style={styles.centerBox}>
          <View
            style={[
              styles.graphicCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <View
              style={[
                styles.iconBubble,
                { backgroundColor: step === 1 ? colors.primarySoft : '#1E3A8A' },
              ]}
            >
              <AppIcon
                name={step === 1 ? 'orders' : 'shield'}
                size={54}
                color={step === 1 ? colors.primary : '#60A5FA'}
              />
            </View>

            <ActivityIndicator
              size="small"
              color={colors.primary}
              style={{ marginTop: 20 }}
            />
          </View>

          {/* Animated Status Message matching PDF Pages 4 & 5 */}
          <AppText
            variant="h2"
            color="textPrimary"
            align="center"
            style={[styles.headline, { marginTop: spacing.xxl }]}
          >
            {step === 1
              ? 'Fetching your name as on PAN...'
              : 'Fetching your PAN details...'}
          </AppText>

          <AppText
            variant="bodySmall"
            color="textSecondary"
            align="center"
            style={{ marginTop: spacing.xs }}
          >
            Connecting securely with NSDL & Income Tax Department
          </AppText>
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  centerBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  graphicCard: {
    width: 140,
    height: 140,
    borderRadius: 24,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBubble: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headline: {
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 26,
  },
});

export default PanFetchingScreen;
