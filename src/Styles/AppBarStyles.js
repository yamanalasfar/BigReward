import { StyleSheet } from "react-native";
import  colors  from "../Const/Colors";
const AppBarStyles = StyleSheet.create({
    container: {
      backgroundColor: colors.White,
      padding: 16,
      paddingTop: 40,
    },
    topBarContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    coinAndGiftsContainer: {
      flex: 1,
    },
    coinContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
    },
    coinText: {
      color: colors.Darkblue,
      marginLeft: 8,
      fontSize: 24,
      fontWeight: 'bold',
    },
    completedGiftsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    completedGiftsText: {
      color: colors.Darkblue,
      fontSize: 16,
      marginLeft: 4,
    },
    progressBarContainer: {
      marginTop: 8,
    },
    backgroundBar: {
      height: 20,
      borderRadius: 10,
      backgroundColor: colors.LightblueUnderlay,
      overflow: 'hidden',
    },
    animatedBar: {
      height: '100%',
    },
    linearGradient: {
      flex: 1,
    },
    progressTextContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
    },
    progressText: {
      color: colors.Darkblue,
      fontSize: 14,
    },
  });
export default AppBarStyles;