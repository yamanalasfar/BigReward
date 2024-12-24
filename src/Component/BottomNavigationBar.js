import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../Screens/Home';
import BottomNavigationBarStyles from '../Styles/BottomNavigationBarStyles';
import AppBar from './AppBar';
import ProfileScreen from '../Screens/Profile';
import GiftsScreen from '../Screens/Gifts';
import ActivityScreen from '../Screens/Activity';
import ReferralScreen from '../Screens/Refral';

const Tab = createBottomTabNavigator();

const BottomTabBar = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true, // Hides the header
        header:()=><AppBar/>,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Gifts') {
            iconName = 'gift';
          } else if (route.name === 'Activity') {
            iconName = 'clock-o';
          }
          else if (route.name === 'Referal') {
            iconName = 'share';
          }
          else if (route.name === 'Profile') {
            iconName = 'user';
          }


          return <FontAwesome name={iconName} size={size} color={color} />;
              },
        ...BottomNavigationBarStyles
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Gifts" component={GiftsScreen} />
      <Tab.Screen name="Activity" component={ActivityScreen} />
      <Tab.Screen name="Referal" component={ReferralScreen}/>
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
export default BottomTabBar;
