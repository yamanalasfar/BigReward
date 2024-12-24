import { StyleSheet } from 'react-native';

const GiftsStyles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    BackGroundImage: {
        flex: 1,
    },
    balanceContainer: {
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 8,
        margin: 10,
        alignItems: 'flex-start',
    },
    balanceText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    listContainer: {
        paddingHorizontal: 10,
        paddingBottom: 20,
    },
    categoryContainer: {
        flex: 1,
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        alignItems: 'center',
        overflow: 'hidden',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    categoryImage: {
        width: '100%',
        height: 80,
        marginBottom: 10,
    },
    categoryName: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default GiftsStyles;
