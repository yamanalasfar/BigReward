import React from 'react';
import { View, Text, Animated } from 'react-native';
import {MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../Const/Colors';
import AppBarStyles from '../Styles/AppBarStyles';

const AppBar = ({ navigation }) => {
  const staticBalance = 100; // Placeholder for balance
  const staticNextPayout = 200; // Placeholder for next payout
  const staticCompletedGifts = 5; // Placeholder for completed gifts
  const progressWidth = '100%'; // Static width for progress bar (50%)

  return (
    <View style={AppBarStyles.container}>
      {/* Top Bar */}
      <View style={AppBarStyles.topBarContainer}>
        <View style={AppBarStyles.coinAndGiftsContainer}>
          <View style={AppBarStyles.coinContainer}>
            <Text style={{ fontSize: 24, color: colors.Red }}>$</Text>
            <Text style={AppBarStyles.coinText}>{staticBalance}</Text>
          </View>
          <View style={AppBarStyles.completedGiftsContainer}>
            <MaterialIcons name="card-giftcard" size={24} color={colors.Darkblue} />
            <Text style={AppBarStyles.completedGiftsText}>{staticCompletedGifts} Completed Gifts</Text>
          </View>
        </View>
      </View>
      {/* Progress Bar */}
      <View style={AppBarStyles.progressBarContainer}>
        <View style={AppBarStyles.backgroundBar}>
          <Animated.View style={[AppBarStyles.animatedBar, { width: progressWidth }]}> 
            <LinearGradient
              colors={[colors.Lightblue, colors.Cerulean]}
              start={[0, 0.5]}
              end={[1, 0.5]}
              style={AppBarStyles.linearGradient}
            />
          </Animated.View>
        </View>
        <View style={AppBarStyles.progressTextContainer}>
          <Text style={AppBarStyles.progressText}>{staticBalance} / {staticNextPayout}</Text>
        </View>
      </View>
    </View>
  );
};
export default AppBar;
