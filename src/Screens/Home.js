import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, ActivityIndicator, StyleSheet, Image,Linking ,Alert} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOffers } from '../Redux/Slices/OffersSlice';
import HomeStyles from '../Styles/HomeStyles';
import CustomButton from '../Component/CustomButton';
import colors from '../Const/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeModules } from 'react-native';
const { TapjoyModule2, FyberModule } = NativeModules;

const OfferItem =async ({ offer, apiToken }) => {

    const startMyKotlinActivity = (userid, appkey, appplacement) => {
        TapjoyModule2.startTapjoyActivity(userid, appkey, appplacement);
    };
      
    const startFyberActivity = (userid, appkey, appid) => {
          FyberModule.startFyberActivity(userid, appkey, appid);
    };
    const token = await AsyncStorage.getItem('token');
    

    const handlePlayPress = () => {
        try {
            const parsedData = JSON.parse(offer.data);
            const appId = parsedData[0].value;
            const securityToken = parsedData[1].value;
            // console.log('Opening Web Offer URL:', offer);
            // if (offer.data.startsWith('http')) {
            //     // Handle web offer
            //     Linking.openURL(offer.data);
            // } else {
            //     // Handle SDK offer 
            //     const parsedData = JSON.parse(offer.data);
            //     const appId = parsedData[0].value;
            //     const securityToken = parsedData[1].value;
            //     Alert.alert('SDK Offer Data', `App ID: ${appId}\nSecurity Token: ${securityToken}`);
            //     if (offer.title == 'Tapjoy') {
            //         startMyKotlinActivity(token, appId, securityToken);
            //     } else if (offer.title == 'Fyber') { 
            //         startFyberActivity(token, securityToken, appId);
            //     }
            // }
            startFyberActivity(token, securityToken, appId);
        } catch (error) {
            console.error('Failed to handle play press:', error);
        }
    };

    return (
        <View style={HomeStyles.gridItem}>
            <Image source={{ uri: offer.network_image }} style={HomeStyles.gridOfferImage} />
            <Text style={HomeStyles.gridOfferTitle}>{offer.title || offer.name}</Text>
            <Text style={HomeStyles.gridOfferDescription}>{offer.description}</Text>
            <CustomButton
                text="Play"
                color={colors.Red}
                underlayColor={colors.RedUnderlay}
                onPress={handlePlayPress}
                TextColor={colors.White}
                icon="play"
                iconSize={18}
            />
        </View>
    );
};

const HomeScreen = ({ navigation }) => {
    const [apiToken, setApiToken] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const dispatch = useDispatch();
    const { sdkOffers, webOffers, cpaOffers, cpvOffers, status, error } = useSelector((state) => state.offers);
    const { countryCode } = useSelector((state) => state.country);

    useEffect(() => {
        const fetchApiToken = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    setApiToken(token);
                } else {
                    console.error('ApiToken not found in AsyncStorage.');
                }
            } catch (err) {
                console.error('Error fetching ApiToken:', err);
            }
        };

        fetchApiToken();
    }, []);

    const fetchData = () => {
        if (countryCode) {
            dispatch(fetchOffers(countryCode));
        }
    };

    useEffect(() => {
        if (status === 'idle' && countryCode) {
            fetchData();
        }
    }, [dispatch, status, countryCode]);

    const handleRefresh = async () => {
        setRefreshing(true);
        try {
            await fetchData(); // Re-fetch offers
        } finally {
            setRefreshing(false);
        }
    };

    if (status === 'loading' && !refreshing) {
        return (
            <View style={HomeStyles.centered}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (status === 'failed') {
        return (
            <View style={HomeStyles.centered}>
                <Text style={GiftsStyles.errorText}>
                    Unable to load offers. Please try again later.
                </Text>
                <TouchableOpacity
                    onPress={() => dispatch(fetchData())}
                    style={GiftsStyles.retryButton}
                >
                    <Text style={GiftsStyles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const categories = [
        { title: 'SDK Offers', data: sdkOffers },
        { title: 'Web Offers', data: webOffers },
        { title: 'CPA Offers', data: cpaOffers },
        { title: 'CPV Offers', data: cpvOffers },
    ];

    const renderCategory = ({ item }) => (
        <View style={HomeStyles.categoryContainer}>
            <Text style={HomeStyles.categoryTitle}>{item.title}</Text>
            <FlatList
                data={item.data}
                keyExtractor={(offer, index) => `${item.title}-${index}`}
                renderItem={({ item }) => <OfferItem offer={item} apiToken={apiToken} />}
                numColumns={2}
                columnWrapperStyle={HomeStyles.columnWrapper}
            />
        </View>
    );

    return (
        <View style={HomeStyles.background}>
            <FlatList
                data={categories.filter((category) => category.data.length > 0)}
                renderItem={renderCategory}
                keyExtractor={(item, index) => `category-${index}`}
                contentContainerStyle={HomeStyles.scrollContent}
                onRefresh={handleRefresh} // Pull-to-refresh handler
                refreshing={refreshing} // Controls refresh spinner
            />
        </View>
    );
};

export default HomeScreen;
