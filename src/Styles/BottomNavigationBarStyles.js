import colors from '../Const/Colors';

const BottomNavigationBarStyles = {
    tabBarActiveTintColor: colors.White, // Active icon color
    tabBarInactiveTintColor: colors.DarkblueUnderlay , // Inactive icon color
    tabBarStyle: {
      position: 'absolute', // Positions the bar absolutely
      bottom: 20, // Space from the bottom
      marginHorizontal: 20, // Space from the left and right
      height: 60, // Height of the bar
      borderRadius: 30, // Rounded corners
      backgroundColor: colors.Darkblue, // Background color
      shadowColor: '#000', // Shadow color
      shadowOpacity: 0.1, // Shadow opacity
      shadowOffset: { width: 0, height: 2 }, // Shadow offset
      shadowRadius: 5, // Shadow radius
      elevation: 5, // Elevation for Android
    },
    tabBarLabelStyle: {
      fontSize: 12, // Font size for labels
    },
};
export default BottomNavigationBarStyles;