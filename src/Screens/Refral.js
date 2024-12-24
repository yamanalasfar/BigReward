import React from 'react';
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  Share,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import images from '../Const/Images';
import ActivityStyles from '../Styles/ActivityStyles';
import colors from '../Const/Colors';

const ReferralScreen = ({ navigation }) => {
  const [userId, setUserId] = React.useState(null);

  React.useEffect(() => {
    const fetchUserId = async () => {
      const token = await AsyncStorage.getItem('token');
      setUserId(token);
    };
    fetchUserId();
  }, []);

  const shareReferralLink = async () => {
    try {
      await Share.share({
        message: `Join me on CashGames: https://cashgames.website/?ref=${userId}`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ImageBackground
      source={images.LoginBackGround}
      style={ActivityStyles.BackGroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.header}>Invite Friends</Text>
        <Text style={styles.howItWorks}>How It Works</Text>
        <Text style={styles.instructions}>
          {'\u2022'} Share your referral link with friends.
          {'\n'}{'\u2022'} Your friends receive bonus coins for joining using your link.
          {'\n'}{'\u2022'} Earn <Text style={styles.boldText}>50% lifetime commission</Text> on their earnings.
        </Text>
        <View style={styles.linkContainer}>
          <Text style={styles.linkText}>
            {userId ? `https://cashgames.website/?ref=${userId}` : 'Loading...'}
          </Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={shareReferralLink} disabled={!userId}>
          <Text style={styles.buttonText}>Share Referral Link</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.Red,
    textAlign: 'center',
    marginBottom: 15,
    fontFamily: 'Roboto',
  },
  howItWorks: {
    fontSize: 18,
    color: colors.Darkblue,
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  instructions: {
    fontSize: 16,
    color: colors.Darkblue,
    lineHeight: 24,
    marginBottom: 25,
    fontFamily: 'Roboto',
  },
  boldText: {
    fontWeight: '700',
    color: colors.Cerulean,
  },
  linkContainer: {
    borderWidth: 1,
    borderColor: colors.Cerulean,
    padding: 15,
    borderRadius: 8,
    marginBottom: 25,
    width: '100%',
    backgroundColor: colors.Darkblue,
  },
  linkText: {
    color: colors.White,
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  button: {
    backgroundColor: colors.Red,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    shadowColor: colors.DarkblueUnderlay,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: colors.White,
    fontWeight: '700',
    fontSize: 16,
    fontFamily: 'Roboto',
  },
});

export default ReferralScreen;
