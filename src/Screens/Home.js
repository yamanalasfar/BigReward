import React, { useEffect, useState } from 'react';
import { Text, View, ImageBackground, FlatList, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOffers } from '../Redux/Slices/OffersSlice';
import HomeStyles from '../Styles/HomeStyles';
import images from '../Const/Images';
import CustomButton from '../Component/CustomButton';
import colors from '../Const/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeModules } from 'react-native';

const { TapjoyModule2, FyberModule } = NativeModules;

const OfferItem = ({ offer, apiToken }) => {
    const startMyKotlinActivity = (userid, appkey, appplacement) => {
        TapjoyModule2.startTapjoyActivity(userid, appkey, appplacement);
    };

    const startFyberActivity = (userid, appkey, appid) => {
        FyberModule.startFyberActivity(userid, appkey, appid);
    };

    const handlePlayPress = () => {
        try {
            if (offer.type === 'web') {
                // Logic for Web Offers
                const offerUrl = offer.data.replace('[app_uid]@@@-', apiToken);
                console.log('Opening Web Offer URL:', offerUrl);
                Linking.openURL(offerUrl).catch((err) =>
                    console.error('Failed to open Web Offer URL:', err)
                );
            } else if (offer.type === 'sdk') {
                // Logic for SDK Offers
                const parsedData = JSON.parse(offer.data);
                const appKey = parsedData.find(item => item.slug === 'app_key')?.value || '';
                const placement = parsedData.find(item => item.slug === 'pleacement')?.value || '';

                if (!appKey || !placement) {
                    console.error('Invalid SDK offer data structure');
                    return;
                }

                console.log(`${appKey} ### ${placement} ### ${apiToken}`);

                switch (offer.title) {
                    case 'Tapjoy':
                        startMyKotlinActivity(apiToken, appKey, placement);
                        break;

                    case 'Fyber':
                        startFyberActivity(apiToken, placement, appKey);
                        break;

                    default:
                        console.log(`No specific logic for SDK offer: ${offer.title}`);
                        break;
                }
            } else {
                console.error('Unknown offer type:', offer.type);
            }
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

    useEffect(() => {
        if (status === 'idle' && countryCode) {
            dispatch(fetchOffers(countryCode));
        }
    }, [dispatch, status, countryCode]);

    if (status === 'loading') {
        return (
            <View style={HomeStyles.centered}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (status === 'failed') {
        return (
            <View style={HomeStyles.centered}>
                <Text>Error loading offers: {error}</Text>
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
            />
        </View>
    );
};

export default HomeScreen;
