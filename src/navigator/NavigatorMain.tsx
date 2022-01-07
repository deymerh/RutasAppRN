import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { PermisionScreen } from '../screens/PermisionScreen';
import { MapScreen } from '../screens/MapScreen';

const Stack = createNativeStackNavigator();

export const NavigatorMain = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: 'white'
          }
        }}
      >
        <Stack.Screen name="PermisionScreen" component={PermisionScreen} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}