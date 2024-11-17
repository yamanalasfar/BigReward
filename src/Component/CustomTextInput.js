import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

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
}) => {
    return (
        <View style = {styles.inputContainer}>
            <TextInput
                style = {styles.input}
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                placeholder={placeholder}
                autoCapitalize="none"
                backgroundColor={backgroundColor}
                borderRadius={15}
                secureTextEntry={secureTextEntry}
                multiline = {multiline} 
            />
            {
                showToggle && (
                    <TouchableOpacity style={styles.iconContainer} onPress={onTogglePress}>
                    <FontAwesome
                        name={secureTextEntry ? "eye-slash" : "eye"}
                        size={24}
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
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 15,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    iconContainer: {
        position: "absolute",
        right: 20,
        top: 13,
    },
});
export default CustomTextInput;