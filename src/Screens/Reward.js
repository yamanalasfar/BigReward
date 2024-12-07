import React from 'react';
import { Text, View, ImageBackground } from 'react-native';
import images from '../Const/Images';
import RewardStyles from '../Styles/RewardStyles';
import AppBar from '../Component/AppBar';

const RewardScreen = ({ navigation }) => {
    return (
        <ImageBackground
        source={images.LoginBackGround}
        style={RewardStyles.BackGroundImage}
        resizeMode='cover'
        >
            <AppBar/>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>RewardScreen</Text>
            </View>
        </ImageBackground>
    );
};
export default RewardScreen;