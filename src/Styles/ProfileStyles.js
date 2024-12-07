import { StyleSheet } from "react-native";
import colors from "../Const/Colors";

const ProfileStyles = StyleSheet.create({
    BackGround: {
        flex: 1,
        width: '100%', 
        height: '100%',
        backgroundColor : colors.White
    },
    ScreenContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems : 'center',
    },
    imageStyle: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    AvatarCircle: {
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom : 10,
    }, 
});
export default ProfileStyles;