import React, { useEffect } from 'react';
import { View, StyleSheet, Image, ActivityIndicator, StatusBar, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { restoreSession } from '../authSlice';
import assets from '../../../config/assets';
import { AppText } from '../../../components/common/AppText';
import { RootStackParamList } from '../../../navigation/navigationTypes';

type SplashScreenNavProp = StackNavigationProp<RootStackParamList, 'Splash'>;

export const SplashScreen: React.FC = () => {
  const navigation = useNavigation<SplashScreenNavProp>();
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoadingSession } = useAppSelector(state => state.auth);

  useEffect(() => {
    // Initiate session restoration
    const timer = setTimeout(() => {
      dispatch(restoreSession());
    }, 600);

    return () => clearTimeout(timer);
  }, [dispatch]);

  useEffect(() => {
    if (!isLoadingSession) {
      if (isAuthenticated) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Auth', params: { screen: 'GrowwWelcome' } }],
        });
      }
    }
  }, [isLoadingSession, isAuthenticated, navigation]);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        {...(Platform.OS === 'android' ? { translucent: true, backgroundColor: 'transparent' } : {})}
      />
      <View style={styles.centerBox}>
        {/* Official Scalpit Company Logo (cleanly sized without white borders or text clipping) */}
        <Image
          source={assets.brand.splashLogo}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#00B386" />
        <AppText
          variant="caption"
          color="textTertiary"
          style={styles.loadingText}
        >
          Securing investment session...
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1726',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centerBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: 260,
    height: 260,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 44 : 32,
  },
  loadingText: {
    marginTop: 10,
    color: '#94A3B8',
    fontSize: 12,
  },
});

export default SplashScreen;
