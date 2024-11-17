import React ,{useState} from 'react';
import { Text, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoginStyles from '../Styles/LoginStyles';
import CustomTextInput from '../Component/CustomTextInput';
import colors from '../Const/Colors';
import images from '../Const/Images';
import CustomButton from '../Component/CustomButton';
import TouchableText from '../Component/TouchableText';

const SignupScreen = ({ navigation }) => {
    const [name, setName] = useState("");
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
                    value={name}
                    onChangeText={setName}
                    placeholder='Name'
                />
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
                    text='Sign up'
                    underlayColor={colors.RedUnderlay}
                    onPress={()=>console.log('Sign up button pressed')}
                />
                <TouchableText
                    color={colors.Darkblue}
                    text='Sign in'
                    onPress={() => navigation.reset({index:0 , routes:[{name:'Login'}]})}
                />
            </SafeAreaView>
        </ImageBackground>
    );
};
export default SignupScreen;