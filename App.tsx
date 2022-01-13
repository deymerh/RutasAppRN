import React from 'react';
import { PermisionProvider } from './src/context/PermisionContext';

import { NavigatorMain } from './src/navigator/NavigatorMain';

const AppState = ({ children }: any) => {
  return (
    <PermisionProvider>
      {children}
    </PermisionProvider>
  )
}

const App = () => {
  return (
    <AppState>
      <NavigatorMain />
    </AppState>
  )
}
export default App;