import React, { useEffect } from 'react';
import { Text, View, ImageBackground, FlatList, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOffers } from '../Redux/Slices/OffersSlice';
import HomeStyles from '../Styles/HomeStyles';
import images from '../Const/Images';
import CustomButton from '../Component/CustomButton';
import colors from '../Const/Colors';

const OfferItem = ({ offer }) => (
    <View style={HomeStyles.gridItem}>
        <Image source={{ uri: offer.network_image }} style={HomeStyles.gridOfferImage} />
        <Text style={HomeStyles.gridOfferTitle}>{offer.title || offer.name}</Text>
        <Text style={HomeStyles.gridOfferDescription}>{offer.description}</Text>
        <CustomButton
            text="Play"
            color={colors.Red}
            underlayColor="#0056b3"
            onPress={() => console.log(`Offer clicked: ${offer.title || offer.name}`)}
            TextColor={colors.White}
            icon="play"
            iconSize={18}
        />
    </View>
);

const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { sdkOffers, webOffers, cpaOffers, cpvOffers, status, error } = useSelector((state) => state.offers);
    const { countryCode } = useSelector((state) => state.country);

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
                renderItem={({ item }) => <OfferItem offer={item} />}
                numColumns={2}
                columnWrapperStyle={HomeStyles.columnWrapper}
            />
        </View>
    );

    return (
        <ImageBackground
            source={images.LoginBackGround}
            style={HomeStyles.backgroundImage}
            resizeMode="cover"
        >
            <FlatList
                data={categories.filter((category) => category.data.length > 0)}
                renderItem={renderCategory}
                keyExtractor={(item, index) => `category-${index}`}
                contentContainerStyle={HomeStyles.scrollContent}
            />
        </ImageBackground>
    );
};
export default HomeScreen;
