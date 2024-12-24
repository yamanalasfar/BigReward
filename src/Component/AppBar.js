import React, { useEffect } from 'react';
import { View, Text, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../Const/Colors';
import AppBarStyles from '../Styles/AppBarStyles';
import { fetchBalance } from '../Redux/Slices/BalanceSlice';
import { fetchGifts } from '../Redux/Slices/GiftsSlice';

const AppBar = ({ navigation }) => {
  const dispatch = useDispatch();

  // Fetch balance and gifts from Redux state
  const balance = useSelector((state) => state.balance.b);
  const completedGifts = useSelector((state) =>
    state.gifts.gifts?.hist?.filter((gift) => gift.is_completed === 1).length || 0
  );
  const nextPayout = useSelector((state) => {
    const payouts = state.gifts.gifts?.cat?.flatMap((cat) => cat.items) || [];
    return payouts.length > 0 ? payouts[0].points : 0;
  });

  useEffect(() => {
    dispatch(fetchBalance());
    dispatch(fetchGifts());
  }, [dispatch]);

  // Calculate progress bar width
  const progressWidth = balance && nextPayout
    ? `${(Math.min(balance / nextPayout, 1) * 100).toFixed(2)}%`
    : '0%';

  return (
    <View style={AppBarStyles.container}>
      {/* Top Bar */}
      <View style={AppBarStyles.topBarContainer}>
        <View style={AppBarStyles.coinAndGiftsContainer}>
          <View style={AppBarStyles.coinContainer}>
            <Text style={{ fontSize: 24, color: colors.Red }}>$</Text>
            <Text style={AppBarStyles.coinText}>{balance || 0}</Text>
          </View>
          <View style={AppBarStyles.completedGiftsContainer}>
            <MaterialIcons name="card-giftcard" size={24} color={colors.Darkblue} />
            <Text style={AppBarStyles.completedGiftsText}>
              {completedGifts} Completed Gifts
            </Text>
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
          <Text style={AppBarStyles.progressText}>
            {balance || 0} / {nextPayout || 0}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default AppBar;
