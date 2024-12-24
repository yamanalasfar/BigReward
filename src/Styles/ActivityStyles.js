import { StyleSheet } from "react-native";
import  colors  from "../Const/Colors";

const ActivityStyles = StyleSheet.create({
    BackGroundImage: {
        flex: 1,
        width: '100%', 
        height: '100%',
        backgroundColor : colors.White
    },
    BackGround: {
        flex: 1,
        justifyContent: 'center',
        alignItems : 'center',
    },
    AppName: {
        fontSize: 36,
        fontFamily: "Roboto",
        fontWeight:"bold",
        textAlign: 'center',
        color: colors.Darkblue,
        marginBottom : 20
    },
    Login: {
        fontSize: 28,
        fontFamily: "Roboto",
        textAlign: 'center',
        color: colors.Darkblue,
        marginBottom : 32
    },
    header: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        position: 'absolute',
        top: 0, 
        left: 0,
        width: '100%',
        paddingTop: 40,
        paddingLeft:20,
        zIndex: 10,
    },
    listContainer: {
        padding: 16,
    },
    listTile: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 12,
        padding: 10,
        alignItems: 'center',
        elevation: 3,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 8,
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
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