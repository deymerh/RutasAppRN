import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useLocation } from '../hooks/useLocation';
import { Fab } from './Fab';
import { Loading } from './Loading';

interface Props {
  markers?: Marker[];
}

export const Map = ({ markers }: Props) => {
  const [showPolyline, setShowPolyline] = useState(true);
  const { hasLocation,
    initialPosition,
    userLocationCurrent,
    routeLines,
    getCurrentLocation,
    followUserLocation,
    stopFollwUserLocation
  } = useLocation();

  const mapViewRef = useRef<MapView>();
  const following = useRef<boolean>(true);

  useEffect(() => {
    followUserLocation();
    return () => {
      stopFollwUserLocation();
    }
  }, []);
  useEffect(() => {
    if (!following.current) return
    const { latitude, longitude } = userLocationCurrent;
    mapViewRef.current?.animateCamera({
      center: { latitude, longitude }
    })
  }, [userLocationCurrent])
  const centerPosition = async () => {
    const { latitude, longitude } = await getCurrentLocation();
    following.current = true;
    mapViewRef.current?.animateCamera({
      center: { latitude, longitude }
    })
  }
  if (!hasLocation) {
    return <Loading />
  }
  return (
    <>
      <MapView
        ref={(el) => mapViewRef.current = el!}
        style={{ ...StyleSheet.absoluteFillObject }}
        showsUserLocation
        initialRegion={{
          latitude: initialPosition.latitude,
          longitude: initialPosition.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onTouchStart={() => following.current = false}
      >
        {
          showPolyline && (<Polyline
            coordinates={routeLines}
            strokeColor='black'
            strokeWidth={3}
          />)
        }
        {/* <Marker
          image={require('../assets/custom-marker.png')}
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          title='Título del Mapa'
          description='Esto es una descripción'
        /> */}
      </MapView>
      <Fab
        onPress={centerPosition}
        iconName='compass-outline'
        style={{ position: 'absolute', bottom: 20, right: 20 }}
      />
      <Fab
        onPress={() => setShowPolyline(!showPolyline)}
        iconName='brush-outline'
        style={{ position: 'absolute', bottom: 80, right: 20 }}
      />
    </>
  )
}
