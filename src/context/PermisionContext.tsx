import React, { createContext, useEffect, useState } from 'react';
import { AppState, Platform } from 'react-native';
import { check, openSettings, PERMISSIONS, PermissionStatus, request } from 'react-native-permissions';

export interface PermisionState {
  locationStatus: PermissionStatus;
}

export const PermisionInitState: PermisionState = {
  locationStatus: 'unavailable'
}

type PermisionContextProps = {
  permisions: PermisionState;
  askLocationPermision: () => void;
  checkLocationPermision: () => void;
}

export const PermisionContext = createContext({} as PermisionContextProps);

export const PermisionProvider = ({ children }: any) => {
  const [permisions, setPermisions] = useState(PermisionInitState);

  useEffect(() => {
    checkLocationPermision();
    AppState.addEventListener('change', state => {
      if (state !== 'active') return;
      checkLocationPermision();
    })
  }, [])


  const askLocationPermision = async () => {
    let permissionStatus: PermissionStatus;
    if (Platform.OS === 'ios') {
      permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      permissionStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }

    if (permisions.locationStatus === 'blocked') {
      openSettings();
    }
    setPermisions({
      ...permisions,
      locationStatus: permissionStatus
    })
  }

  const checkLocationPermision = async () => {
    let permissionStatus: PermissionStatus;
    if (Platform.OS === 'ios') {
      permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }
    setPermisions({
      ...permisions,
      locationStatus: permissionStatus
    })
  }

  return (
    <PermisionContext.Provider value={{
      permisions,
      askLocationPermision,
      checkLocationPermision
    }}>
      {children}
    </PermisionContext.Provider>
  )
}