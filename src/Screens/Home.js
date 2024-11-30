import React, { useEffect } from 'react';
import { Text, View, ImageBackground, FlatList, ActivityIndicator, StyleSheet, Image, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOffers } from '../Redux/Slices/OffersSlice';
import HomeStyles from '../Styles/HomeStyles';
import images from '../Const/Images';
import CustomButton from '../Component/CustomButton';

const OfferItem = ({ offer }) => (
    <View style={HomeStyles.offerItem}>
        {/* Image Section */}
        <Image source={{ uri: offer.network_image }} style={HomeStyles.offerImage} />
        
        {/* Text Section */}
        <View style={HomeStyles.textContainer}>
            <Text style={HomeStyles.offerTitle}>{offer.title || offer.name}</Text>
            <Text style={HomeStyles.offerDescription}>{offer.description}</Text>
        </View>
        
        {/* Button Section */}
        <CustomButton
            text="Learn More"
            color="#007bff"
            underlayColor="#0056b3"
            onPress={() => console.log(`Offer clicked: ${offer.title || offer.name}`)}
            TextColor="#fff"
            icon="info-circle"
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

    const renderOffers = (category, data) => (
        <View style={HomeStyles.categoryContainer}>
            <Text style={HomeStyles.categoryTitle}>{category}</Text>
            <FlatList
                data={data}
                keyExtractor={(item, index) => `${category}-${index}`}
                renderItem={({ item }) => <OfferItem offer={item} />}
                scrollEnabled={false} // Prevent FlatList from being scrollable inside ScrollView
            />
        </View>
    );

    return (
        <ImageBackground
            source={images.LoginBackGround}
            style={HomeStyles.BackGroundImage}
            resizeMode="cover"
        >
            <ScrollView contentContainerStyle={HomeStyles.scrollContent}>
                <View style={HomeStyles.pageContainer}>
                    {sdkOffers.length > 0 && renderOffers('SDK Offers', sdkOffers)}
                    {webOffers.length > 0 && renderOffers('Web Offers', webOffers)}
                    {cpaOffers.length > 0 && renderOffers('CPA Offers', cpaOffers)}
                    {cpvOffers.length > 0 && renderOffers('CPV Offers', cpvOffers)}
                </View>
            </ScrollView>
        </ImageBackground>
    );
};
export default HomeScreen;
