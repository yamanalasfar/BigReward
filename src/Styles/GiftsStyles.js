import { StyleSheet } from 'react-native';

const GiftsStyles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
    },
    retryButton: {
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 5,
    },
    retryButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    emptyStateText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'gray',
        marginTop: 20,
    },
    listContainer: {
        paddingHorizontal: 10,
        paddingBottom: 20,
    },
    categoryContainer: {
        flex: 1,
        margin: 10,
        alignItems: 'center',
    },
    categoryImage: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    categoryName: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
    },
    balanceContainer: {
        padding: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
    },
    balanceText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    BackGroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
});

export default GiftsStyles;
