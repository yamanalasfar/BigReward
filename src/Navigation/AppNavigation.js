import * as React from 'react';
import LoginScreen from '../Screens/Login';
import HomeScreen from '../Screens/Home';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from '../Screens/Signup';
import RestorPasswordScreen from '../Screens/RestorePassword';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name='Signup' component={SignupScreen} options={{ headerShown: false }} />
      <Stack.Screen name='Recovery' component={RestorPasswordScreen} options={{ headerShown: false }}/>
      <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;