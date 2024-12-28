import React, { useEffect, useState } from 'react';
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
    const [refreshing, setRefreshing] = useState(false); // State for pull-to-refresh
    const dispatch = useDispatch();
    const { categories, balance, status, error } = useSelector((state) => state.gifts);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchGifts());
        }
    }, [dispatch, status]);

    // Pull-to-refresh handler
    const handleRefresh = async () => {
        setRefreshing(true);
        try {
            await dispatch(fetchGifts()).unwrap();
        } catch (err) {
            console.error('Failed to refresh gifts:', err);
        } finally {
            setRefreshing(false);
        }
    };

    // Display loading spinner while data is being fetched
    if (status === 'loading' && !refreshing) {
        return (
            <View style={GiftsStyles.centered}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    // Display error message with retry button
    if (status === 'failed') {
        return (
            <View style={GiftsStyles.centered}>
                <Text style={GiftsStyles.errorText}>
                    Unable to load gifts. Please try again later.
                </Text>
                <TouchableOpacity
                    onPress={() => dispatch(fetchGifts())}
                    style={GiftsStyles.retryButton}
                >
                    <Text style={GiftsStyles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // Render individual gift categories
    const renderCategory = ({ item }) => (
        <TouchableOpacity
            style={GiftsStyles.categoryContainer}
            onPress={() =>
                navigation.navigate('GiftsPage', {
                    items: item.items,
                    categoryImage: item.image,
                    userPoints: balance,
                })
            }
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
                {/* Balance Display */}
                <View style={GiftsStyles.balanceContainer}>
                    <Text style={GiftsStyles.balanceText}>Gifts</Text>
                </View>
                {/* Gift Categories */}
                <FlatList
                    data={categories}
                    renderItem={renderCategory}
                    keyExtractor={(item) => item.name}
                    numColumns={2}
                    contentContainerStyle={GiftsStyles.listContainer}
                    onRefresh={handleRefresh} // Pull-to-refresh functionality
                    refreshing={refreshing} // Show refreshing spinner
                    ListEmptyComponent={
                        <Text style={GiftsStyles.emptyStateText}>
                            No gift categories available.
                        </Text>
                    } // Empty state fallback
                    initialNumToRender={6} // Optimize initial rendering
                    windowSize={5} // Optimize memory usage
                />
            </View>
        </ImageBackground>
    );
};

export default GiftsScreen;
