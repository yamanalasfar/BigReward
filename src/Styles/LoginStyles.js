import { StyleSheet } from "react-native";
import  colors  from "../Const/Colors";

const LoginStyles = StyleSheet.create({
    BackGround: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.MainDark,
    },
    AppName: {
        fontSize: 36,
        fontFamily: "Roboto",
        fontWeight: "bold",
        textAlign: 'center',
        color: colors.White,
        marginBottom: 20
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
export default LoginStyles;