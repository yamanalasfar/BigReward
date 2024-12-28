import React ,{useState , useEffect} from 'react';
import { Text, ImageBackground} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoginStyles from '../Styles/LoginStyles';
import CustomTextInput from '../Component/CustomTextInput';
import colors from '../Const/Colors';
import CustomButton from '../Component/CustomButton';
import TouchableText from '../Component/TouchableText';
import uuid from 'react-native-uuid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountryCode } from '../Redux/Slices/CountryCodeSlice';
import login from '../Api\'s/Login';



const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const did = uuid.v4();
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const { countryCode, status, error } = useSelector((state) => state.country);
    
    useEffect(() => {
        if (status === 'idle') {
          dispatch(fetchCountryCode());
        }
    }, [dispatch, status]);

    const handleSignin = async () => {
        login(email, password, countryCode, did, navigation, setLoading);
        console.log(countryCode);  
    };
    return (    
        <SafeAreaView style={LoginStyles.BackGround}>
            <Text style={LoginStyles.AppName}>Big Reward</Text>
            <CustomTextInput
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
                placeholder='Email'
                cursorColor={colors.White}
                placeholderTextColor={colors.White}
            />
            <CustomTextInput  
                value={password}
                onChangeText={setPassword}
                placeholder='Password'
                cursorColor={colors.White}
                placeholderTextColor={colors.White}
                secureTextEntry={!showPassword}
                showToggle={true}
                onTogglePress={() => setShowPassword(!showPassword)}    
            />
            <CustomButton
                TextColor={colors.White}    
                color={colors.Orange}
                text='Sign in'
                underlayColor={colors.LightOrange}
                onPress={handleSignin}
                disabled={loading}
            />
            <CustomButton
                TextColor={colors.White}
                color={colors.Cerulean}
                text='Sign in with Google'
                underlayColor={colors.CeruleanUnderlay}
                icon='google'
                iconSize={24}
                onPress={() => promptAsync()}
            />
            <TouchableText
                color={colors.Orange}
                text='Forgot Password?'
                onPress={() => navigation.navigate('Recovery')}
            />
            <TouchableText  
                color={colors.Cerulean}
                text='Create an Account'
                onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Signup' }] })}
            />
        </SafeAreaView>
    );
};
export default LoginScreen;