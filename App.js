import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/Navigation/AppNavigation';
import { Provider } from 'react-redux';
import store from './src/Redux/Store';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />  
      </NavigationContainer>
    </Provider>
  );
}
