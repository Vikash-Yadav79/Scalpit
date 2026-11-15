/* eslint-env jest */
require('react-native-gesture-handler/jestSetup');

jest.mock('lucide-react-native', () => {
  const React = require('react');
  const { View } = require('react-native');
  const createMockIcon = () => (props: any) => React.createElement(View, props);
  return new Proxy(
    {},
    {
      get: () => createMockIcon(),
    }
  );
});

jest.mock('react-native-keychain', () => ({
  setGenericPassword: jest.fn().mockResolvedValue(true),
  getGenericPassword: jest.fn().mockResolvedValue(false),
  resetGenericPassword: jest.fn().mockResolvedValue(true),
  ACCESSIBLE: {
    WHEN_UNLOCKED_THIS_DEVICE_ONLY: 'AccessibleWhenUnlockedThisDeviceOnly',
  },
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn().mockResolvedValue(null),
  getItem: jest.fn().mockResolvedValue(null),
  removeItem: jest.fn().mockResolvedValue(null),
  clear: jest.fn().mockResolvedValue(null),
  getAllKeys: jest.fn().mockResolvedValue([]),
  multiGet: jest.fn().mockResolvedValue([]),
  multiSet: jest.fn().mockResolvedValue(null),
  multiRemove: jest.fn().mockResolvedValue(null),
}));

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default = {
    ...Reanimated.default,
    createAnimatedComponent: (c: any) => c,
    call: () => {},
  };
  Reanimated.createAnimatedComponent = (c: any) => c;
  return Reanimated;
});
