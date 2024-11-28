import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../Screens/Home';
import ActivityScreen from '../Screens/Activity';
import RewardScreen from '../Screens/Reward';
import BottomNavigationBarStyles from '../Styles/BottomNavigationBarStyles';

const Tab = createBottomTabNavigator();

const BottomTabBar = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // Hides the header
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Activity') {
            iconName = 'clock-o';
          } else if (route.name === 'Reward') {
            iconName = 'gift';
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
              },
        ...BottomNavigationBarStyles
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Activity" component={ActivityScreen} />
      <Tab.Screen name="Reward" component={RewardScreen} />
    </Tab.Navigator>
  );
};
export default BottomTabBar;
