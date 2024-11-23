import React, { useState } from 'react';
import { Text, ImageBackground, StyleSheet, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import LoginStyles from '../Styles/LoginStyles';
import CustomTextInput from '../Component/CustomTextInput';
import colors from '../Const/Colors';
import images from '../Const/Images';
import CustomButton from '../Component/CustomButton';
import resetPassword from '../Api\'s/RestorePassword';

const RestorPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async () => {
        resetPassword(email , setLoading);
      };
    return (
        <ImageBackground
            source={images.LoginBackGround}
            style={LoginStyles.BackGroundImage}
            resizeMode="cover"
        >
            <SafeAreaView style={LoginStyles.BackGround}>
                <View style={LoginStyles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <FontAwesome name="arrow-left" size={24} color={colors.Darkblue} />
                    </TouchableOpacity>
                </View>
                <Text style={LoginStyles.AppName}>Password Recovery</Text>
                <CustomTextInput
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    placeholder="Email"
                />
                <CustomButton
                    TextColor={colors.White}
                    color={colors.Red}
                    text="Send Recovery Email"
                    underlayColor={colors.RedUnderlay}
                    onPress={handleResetPassword}
                    disabled={loading}
                />
            </SafeAreaView>
        </ImageBackground>
    );
};

export default RestorPasswordScreen;
