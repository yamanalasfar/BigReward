import * as React from 'react';
import LoginScreen from '../Screens/Login';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from '../Screens/Signup';
import RestorPasswordScreen from '../Screens/RestorePassword';
import ActivityScreen from '../Screens/Activity';
import RewardScreen from '../Screens/Reward';
import BottomTabBar from '../Component/BottomNavigationBar';
import ProfileScreen from '../Screens/Profile';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Login' >
      <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name='Signup' component={SignupScreen} options={{ headerShown: false }} />
      <Stack.Screen name='Recovery' component={RestorPasswordScreen} options={{ headerShown: false }}/>
      <Stack.Screen name='Home' component={BottomTabBar} options={{ headerShown: false }} />
      <Stack.Screen name='Activity' component={ActivityScreen} options={{ headerShown: false }} />
      <Stack.Screen name='Reward' component={RewardScreen} options={{ headerShown: false }} />
      <Stack.Screen name='Profile' component={ProfileScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;