import React ,{useState} from 'react';
import { Text, ImageBackground} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoginStyles from '../Styles/LoginStyles';
import CustomTextInput from '../Component/CustomTextInput';
import colors from '../Const/Colors';
import images from '../Const/Images';
import CustomButton from '../Component/CustomButton';
import TouchableText from '../Component/TouchableText';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    return (
        <ImageBackground
            source={images.LoginBackGround}
            style={LoginStyles.BackGroundImage}
            resizeMode='cover'
        >
            <SafeAreaView style={LoginStyles.BackGround}>
                <Text style={LoginStyles.AppName}>Big Reward</Text>
                <CustomTextInput
                    value={email}
                    onChangeText={setEmail}
                    keyboardType='email-address'
                    placeholder='Email'
                />
                <CustomTextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder='Password'
                    secureTextEntry={!showPassword}
                    showToggle={true}
                    onTogglePress={()=>setShowPassword(!showPassword)}
                />
                <CustomButton
                    TextColor={colors.White}
                    color={colors.Red}
                    text='Sign in'
                    underlayColor={colors.RedUnderlay}
                    onPress={()=>console.log('Login button pressed')}
                />
                <CustomButton
                    TextColor={colors.White}
                    color={colors.Cerulean}
                    text='Sign in with Google'
                    underlayColor={colors.CeruleanUnderlay}
                    icon='google'
                    onPress={()=>console.log('Google button pressed')}
                />
                <TouchableText
                    color={colors.Red}
                    text='Forgot Password?'
                    onPress={() => navigation.navigate('Recovery')}
                />
                <TouchableText
                    color={colors.Darkblue}
                    text='Create an Account'
                    onPress={() => navigation.reset({index:0 , routes:[{name:'Signup'}]})}
                />
            </SafeAreaView>
        </ImageBackground>
    );
};
export default LoginScreen;