import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import colors from "../Const/Colors";

const CustomTextInput = ({
    value,
    onChangeText,
    keyboardType,
    placeholder,
    backgroundColor,
    secureTextEntry = false,
    multiline,
    showToggle = false,
    onTogglePress, 
    placeholderTextColor,
    cursorColor
}) => {
    return (
        <View style = {styles.inputContainer}>
            <TextInput
                style = {styles.input}
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                autoCapitalize="none"
                backgroundColor={backgroundColor}
                borderRadius={15}
                secureTextEntry={secureTextEntry}
                multiline={multiline} 
                cursorColor={cursorColor}
            />
            {
                showToggle && (
                    <TouchableOpacity style={styles.iconContainer} onPress={onTogglePress}>
                        <FontAwesome
                            name={secureTextEntry ? "eye-slash" : "eye"}
                            size={24}
                            color={colors.White}
                        />
                    </TouchableOpacity>
                )}
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom : 20,
      },
      input: {
        height: 50,
        borderColor: colors.White,
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 15,
        paddingRight: 15,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
        color:colors.White
    },
    iconContainer: {
        position: "absolute",
        right: 20,
        top: 13,
    },
});
export default CustomTextInput;