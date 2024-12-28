import React ,{useState ,useEffect } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoginStyles from '../Styles/LoginStyles';
import CustomTextInput from '../Component/CustomTextInput';
import colors from '../Const/Colors';
import CustomButton from '../Component/CustomButton';
import TouchableText from '../Component/TouchableText';
import uuid from 'react-native-uuid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountryCode } from '../Redux/Slices/CountryCodeSlice';
import signup from '../Api\'s/Signup';

const SignupScreen = ({ navigation }) => {
    const [name, setName] = useState("");
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
    const handleSignup = async () => {
        signup(name, email, password, countryCode, navigation, did, setLoading);
      };
    return (
        <SafeAreaView style={LoginStyles.BackGround}>
            <Text style={LoginStyles.AppName}>Big Reward</Text>
            <CustomTextInput
                value={name}
                onChangeText={setName}
                placeholder='Name'
                cursorColor={colors.White}
                placeholderTextColor={colors.White}  
            />
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
                text='Sign up'
                underlayColor={colors.LightOrange}
                onPress={handleSignup}
                disabled={loading}  
            />
            <TouchableText
                color={colors.Cerulean}
                text='Sign in'
                onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Login' }] })}  
            />    
        </SafeAreaView>
    );
};
export default SignupScreen;