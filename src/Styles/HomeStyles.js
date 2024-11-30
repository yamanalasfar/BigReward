import { StyleSheet } from "react-native";
import  colors  from "../Const/Colors";

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
});
export default HomeStyles;