import React from 'react';
import { Text, View, ImageBackground } from 'react-native';
import images from '../Const/Images';
import RewardStyles from '../Styles/RewardStyles';

const RewardScreen = ({ navigation }) => {
    return (
        <ImageBackground
        source={images.LoginBackGround}
        style={RewardStyles.BackGroundImage}
        resizeMode='cover'
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>RewardScreen</Text>
            </View>
        </ImageBackground>
    );
};
export default RewardScreen;