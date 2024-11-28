import { StyleSheet } from "react-native";
import  colors  from "../Const/Colors";

const ActivityStyles = StyleSheet.create({
    BackGroundImage: {
        flex: 1,
        width: '100%', 
        height: '100%',
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
});
export default ActivityStyles;