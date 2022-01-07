import React from 'react';
import { Text, View } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export const MapScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: 'black' }}>MapScreen</Text>
      <Icon name="rocket" size={30} color="#900" />;
    </View>
  )
}
