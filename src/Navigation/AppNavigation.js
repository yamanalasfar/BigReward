import * as React from 'react';
import LoginScreen from '../Screens/Login';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from '../Screens/Signup';
import RestorPasswordScreen from '../Screens/RestorePassword';
import BottomTabBar from '../Component/BottomNavigationBar';
import ProfileScreen from '../Screens/Profile';
import GiftsItems from '../Screens/GiftsItems';
import GiftsScreen from '../Screens/Gifts';
import ActivityScreen from '../Screens/Activity';
import ReferralScreen from '../Screens/Refral';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Login' >
      <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name='Signup' component={SignupScreen} options={{ headerShown: false }} />
      <Stack.Screen name='Recovery' component={RestorPasswordScreen} options={{ headerShown: false }}/>
      <Stack.Screen name='Home' component={BottomTabBar} options={{ headerShown: false }} />
      <Stack.Screen name='Gifts' component={GiftsScreen} options={{ headerShown: false }} />
      <Stack.Screen name='Activity' component={ActivityScreen} options={{ headerShown: false }} />
      <Stack.Screen name='Profile' component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="GiftsPage" component={GiftsItems} options={{ headerShown: false }} />
      <Stack.Screen name="Referal" component={ReferralScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

export default AppNavigator;