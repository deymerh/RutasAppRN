import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { PermisionScreen } from '../screens/PermisionScreen';
import { MapScreen } from '../screens/MapScreen';
import { PermisionContext } from '../context/PermisionContext';

import { Loading } from '../components/Loading';

const Stack = createNativeStackNavigator();

export const NavigatorMain = () => {
  const { permisions } = useContext(PermisionContext);
  if (permisions.locationStatus === 'unavailable') {
    return <Loading />
  }
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
        {
          (permisions.locationStatus === 'granted')
            ? <Stack.Screen name="MapScreen" component={MapScreen} />
            : <Stack.Screen name="PermisionScreen" component={PermisionScreen} />
        }


      </Stack.Navigator>
    </NavigationContainer>
  );
}