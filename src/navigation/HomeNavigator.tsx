import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../features/home/screens/HomeScreen';

export type HomeStackParamList = {
  HomeMain: undefined;
};

const Stack = createStackNavigator<HomeStackParamList>();

export const HomeNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
