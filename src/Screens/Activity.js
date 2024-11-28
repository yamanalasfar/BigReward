import React from 'react';
import { Text, View, ImageBackground } from 'react-native';
import images from '../Const/Images';
import ActivityStyles from '../Styles/ActivityStyles';

const ActivityScreen = ({ navigation }) => {
    return (
        <ImageBackground
        source={images.LoginBackGround}
        style={ActivityStyles.BackGroundImage}
        resizeMode='cover'
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>ActivityScreen</Text>
            </View>
        </ImageBackground>
    );
};
export default ActivityScreen;