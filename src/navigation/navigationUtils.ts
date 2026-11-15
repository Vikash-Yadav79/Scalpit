import { createNavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from './navigationTypes';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

/**
 * Resets the entire root navigation stack to the Auth flow at a specific screen (defaults to Login)
 */
export function resetToAuth(screenName: string = 'Login') {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [
        {
          name: 'Auth',
          params: {
            screen: screenName,
          } as any,
        },
      ],
    });
  }
}

/**
 * Resets the root navigation stack to the Main Tab dashboard
 */
export function resetToMain() {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
  }
}
