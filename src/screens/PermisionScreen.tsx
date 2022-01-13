import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { BlackButton } from '../components/BlackButton';

import { PermisionContext } from '../context/PermisionContext';

export const PermisionScreen = () => {
  const { permisions, checkLocationPermision, askLocationPermision } = useContext(PermisionContext);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: 'black' }}>La aplicacón necesita acceso al GPS</Text>
      <View style={{ marginTop: 20 }}>
        <BlackButton title='Activar GPS' onPress={askLocationPermision} />
        <Text style={{ color: 'black', marginTop: 10, textAlign: 'center' }}>Permiso: {permisions.locationStatus}</Text>
      </View>
    </View>
  )
}
