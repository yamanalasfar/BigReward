import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, Image, ActivityIndicator, StyleSheet, ImageBackground } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import images from '../Const/Images';
import ActivityStyles from '../Styles/ActivityStyles';
import { fetchHist } from '../Redux/Slices/ActivitySlice';

const ActivityScreen = () => {
    const dispatch = useDispatch();
    const { hist, status, error } = useSelector((state) => state.history);

    // State for pull-to-refresh
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchHist());
        }
    }, [dispatch, status]);

    // Pull-to-refresh handler
    const handleRefresh = async () => {
        setRefreshing(true);
        try {
            await dispatch(fetchHist()).unwrap();
        } catch (err) {
            console.error('Failed to refresh history:', err);
        } finally {
            setRefreshing(false);
        }
    };

    // Display loading spinner while data is being fetched
    if (status === 'loading' && !refreshing) {
        return (
            <View style={ActivityStyles.centered}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    // Display error message with retry button
    if (status === 'failed') {
        return (
            <View style={ActivityStyles.centered}>
                <Text style={ActivityStyles.errorText}>Error loading activity.</Text>
                <Text style={ActivityStyles.errorMessage}>{error}</Text>
                <View style={ActivityStyles.retryButtonContainer}>
                    <Text onPress={() => dispatch(fetchHist())} style={ActivityStyles.retryButton}>
                        Retry
                    </Text>
                </View>
            </View>
        );
    }

    return (
        <ImageBackground
            source={images.LoginBackGround}
            style={ActivityStyles.BackGroundImage}
            resizeMode="cover"
        >
            <FlatList
                data={hist}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={ActivityStyles.listContainer}
                renderItem={({ item }) => (
                    <View style={ActivityStyles.listTile}>
                        <Image source={{ uri: item.image }} style={ActivityStyles.image} />
                        <View style={ActivityStyles.textContainer}>
                            <Text style={ActivityStyles.title}>{item.g_name}</Text>
                            <Text style={ActivityStyles.subtitle}>{item.message}</Text>
                        </View>
                    </View>
                )}
                onRefresh={handleRefresh} // Pull-to-refresh functionality
                refreshing={refreshing} // Show refreshing spinner
                ListEmptyComponent={
                    <Text style={ActivityStyles.emptyStateText}>No activity available.</Text>
                } // Empty state fallback
                initialNumToRender={6} // Optimize initial rendering
                windowSize={5} // Optimize memory usage
            />
        </ImageBackground>
    );
};

export default ActivityScreen;

// import React, { useEffect, useState } from 'react';
// import { Text, View, FlatList, Image, StyleSheet, ImageBackground } from 'react-native';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchHist } from '../Redux/Slices/ActivitySlice';
// import images from '../Const/Images';
// import RewardStyles from '../Styles/RewardStyles';

// const ActivityScreen = () => {
//     const dispatch = useDispatch();
//     const { hist: apiHist, status, error } = useSelector((state) => state.history);

//     // Mock data for testing
//     const mockHist = [
//         {
//             g_name: "Gift 1",
//             message: "This is a demo message for Gift 1.",
//             image: "https://via.placeholder.com/150",
//             is_completed: true,
//         },
//         {
//             g_name: "Gift 2",
//             message: "This is a demo message for Gift 2.",
//             image: "https://via.placeholder.com/150",
//             is_completed: false,
//         },
//         {
//             g_name: "Gift 3",
//             message: "This is a demo message for Gift 3.",
//             image: "https://via.placeholder.com/150",
//             is_completed: true,
//         },
//     ];

//     const [hist, setHist] = useState(mockHist); // Use mock data initially

//     useEffect(() => {
//         // Fetch real API data
//         dispatch(fetchHist());
//     }, [dispatch]);

//     useEffect(() => {
//         if (status === "succeeded" && apiHist.length > 0) {
//             setHist(apiHist); // Replace mock data with real data
//         }
//     }, [status, apiHist]);

//     if (status === 'loading') {
//         return <Text>Loading...</Text>;
//     }

//     if (status === 'failed') {
//         return <Text>Error: {error}</Text>;
//     }

//     return (
//         <ImageBackground
//             source={images.LoginBackGround}
//             style={RewardStyles.BackGroundImage}
//             resizeMode="cover"
//         >
//             <FlatList
//                 data={hist}
//                 keyExtractor={(item, index) => index.toString()}
//                 contentContainerStyle={styles.listContainer}
//                 renderItem={({ item }) => (
//                     <View style={styles.listTile}>
//                         <Image source={{ uri: item.image }} style={styles.image} />
//                         <View style={styles.textContainer}>
//                             <Text style={styles.title}>{item.g_name}</Text>
//                             <Text style={styles.subtitle}>{item.message}</Text>
//                         </View>
//                     </View>
//                 )}
//             />
//         </ImageBackground>
//     );
// };

// const styles = StyleSheet.create({
//     listContainer: {
//         padding: 16,
//     },
//     listTile: {
//         flexDirection: 'row',
//         backgroundColor: '#fff',
//         borderRadius: 8,
//         marginBottom: 12,
//         padding: 10,
//         alignItems: 'center',
//         elevation: 3,
//     },
//     image: {
//         width: 50,
//         height: 50,
//         borderRadius: 8,
//         marginRight: 12,
//     },
//     textContainer: {
//         flex: 1,
//     },
//     title: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: '#333',
//     },
//     subtitle: {
//         fontSize: 14,
//         color: '#666',
//     },
// });

// export default ActivityScreen;
