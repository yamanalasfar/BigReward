import { StyleSheet } from "react-native";
import colors from "../Const/Colors";

const HomeStyles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        flexGrow: 1, // Allow ScrollView to take up full height
        padding: 16,
    },
    pageContainer: {
        flex: 1,
    },
    categoryContainer: {
        marginBottom: 24, // Space between categories
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    offerItem: {
        marginVertical: 8,
        backgroundColor: '#fff',
        borderRadius: 12,
        elevation: 4,
        overflow: 'hidden', // Ensure the image respects borderRadius
    },
    offerImage: {
        width: '100%',
        aspectRatio: 16 / 9, // Maintain a 16:9 aspect ratio
        resizeMode: 'cover', // Cover the entire container
    },
    textContainer: {
        padding: 16,
    },
    offerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    offerDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 16, // Space between description and button
    },
    // New styles for grid layout
    columnWrapper: {
        justifyContent: 'space-between', // Distribute items evenly
        marginBottom: 16,
    },
    gridItem: {
        flex: 1,
        margin: 8,
        borderRadius: 12,
        backgroundColor: colors.White,
        padding: 16,
        alignItems: 'center',
        shadowColor: colors.Cerulean,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    gridOfferImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginBottom: 8,
        resizeMode: 'cover',
    },
    gridOfferTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
    },
    gridOfferDescription: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 8,
    },
    backgroundImage: {
        flex : 1
    }
});
export default HomeStyles;
