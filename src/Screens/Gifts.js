import React, { useEffect } from 'react';
import {
    Text,
    View,
    ImageBackground,
    ActivityIndicator,
    FlatList,
    Image,
    TouchableOpacity,
} from 'react-native';
import images from '../Const/Images';
import GiftsStyles from '../Styles/GiftsStyles';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGifts } from '../Redux/Slices/GiftsSlice';

const GiftsScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { categories, balance, status, error } = useSelector((state) => state.gifts);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchGifts());
        }
    }, [dispatch, status]);

    if (status === 'loading') {
        return (
            <View style={GiftsStyles.centered}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (status === 'failed') {
        return (
            <View style={GiftsStyles.centered}>
                <Text>Error loading activity:</Text>
                <Text>{typeof error === 'object' ? JSON.stringify(error) : error}</Text>
            </View>
        );
    }

    const renderCategory = ({ item }) => (
        <TouchableOpacity
            style={GiftsStyles.categoryContainer}
            onPress={() => navigation.navigate('GiftsPage', { items: item.items , categoryImage:item.image , userPoints: balance})}
        >
            <Image
                source={{ uri: item.image }}
                style={GiftsStyles.categoryImage}
                resizeMode="contain"
            />
            <Text style={GiftsStyles.categoryName}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <ImageBackground
            source={images.LoginBackGround}
            style={GiftsStyles.BackGroundImage}
            resizeMode="cover"
        >
            <View style={{ flex: 1 }}>
                <View style={GiftsStyles.balanceContainer}>
                    <Text style={GiftsStyles.balanceText}>Gifts</Text>
                </View>
                <FlatList
                    data={categories}
                    renderItem={renderCategory}
                    keyExtractor={(item) => item.name}
                    numColumns={2}
                    contentContainerStyle={GiftsStyles.listContainer}
                />
            </View>
        </ImageBackground>
    );
};

export default GiftsScreen;
