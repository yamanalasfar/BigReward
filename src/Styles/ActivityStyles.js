import { StyleSheet } from "react-native";
import  colors  from "../Const/Colors";

const ActivityStyles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    errorMessage: {
        color: 'gray',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    retryButtonContainer: {
        marginTop: 20,
    },
    retryButton: {
        fontSize: 16,
        color: '#007BFF',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    emptyStateText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'gray',
        marginTop: 20,
    },
    BackGroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    listContainer: {
        paddingHorizontal: 10,
        paddingBottom: 20,
    },
    listTile: {
        flexDirection: 'row',
        padding: 10,
        marginBottom: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 25,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
    },
});
export default ActivityStyles;