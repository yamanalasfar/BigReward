import React, { useEffect } from 'react';
import { Text, View, ImageBackground, ActivityIndicator } from 'react-native';
import images from '../Const/Images';
import ActivityStyles from '../Styles/ActivityStyles';
import { useSelector, useDispatch } from 'react-redux';
import { fetchActivity } from '../Redux/Slices/ActivitySlice';

const ActivityScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { activity, status, error } = useSelector((state) => state.activity);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchActivity());
        }
    }, [dispatch, status]);

    if (status === 'loading') {
        return (
            <View style={ActivityStyles.centered}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (status === 'failed') {
        return (
            <View style={ActivityStyles.centered}>
                <Text>Error loading activity:</Text>
                <Text>{typeof error === 'object' ? JSON.stringify(error) : error}</Text>
            </View>
        );
    }

    return (
        <ImageBackground
            source={images.LoginBackGround}
            style={ActivityStyles.BackGroundImage}
            resizeMode="cover"
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>ActivityScreen</Text>
            </View>
        </ImageBackground>
    );
};

export default ActivityScreen;
