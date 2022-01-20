import { useEffect, useState, useRef } from 'react';

import Geolocation from '@react-native-community/geolocation';

import { Location } from '../interfaces/appInterfaces';

export const useLocation = () => {
  const [hasLocation, setHasLocation] = useState(false);
  const [routeLines, setRouteLines] = useState<Location[]>([]);
  const [initialPosition, setinitialPosition] = useState<Location>({
    latitude: 0,
    longitude: 0
  });
  const [userLocationCurrent, setUserLocationCurrent] = useState<Location>({
    latitude: 0,
    longitude: 0
  });

  const watchId = useRef<number>();
  const isMounted = useRef<boolean>(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);


  useEffect(() => {
    getCurrentLocation()
      .then(location => {
        if (isMounted.current) return;
        setinitialPosition(location);
        setUserLocationCurrent(location);
        setRouteLines(routes => [...routes, location]);
        setHasLocation(true);
      })
  }, [])

  const getCurrentLocation = (): Promise<Location> => {
    return new Promise((resolve, reject) => {
      if (isMounted.current) return;
      Geolocation.getCurrentPosition(
        ({ coords }) => {
          resolve({
            latitude: coords.latitude,
            longitude: coords.longitude
          })
        },
        (err) => reject({ err }), { enableHighAccuracy: false })
    })
  }

  const followUserLocation = () => {
    watchId.current = Geolocation.watchPosition(
      ({ coords }) => {
        const location: Location = {
          latitude: coords.latitude,
          longitude: coords.longitude
        }
        setUserLocationCurrent(location);
        setRouteLines(routes => [...routes, location]);
      }
    )
  }

  const stopFollwUserLocation = () => {
    if (watchId)
      Geolocation.clearWatch(watchId.current!);
  }

  return {
    hasLocation,
    initialPosition,
    userLocationCurrent,
    routeLines,
    stopFollwUserLocation,
    getCurrentLocation,
    followUserLocation
  }
}
