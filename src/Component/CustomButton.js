import React from 'react';
import { TouchableHighlight, Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CustomButton = ({ text, color, underlayColor, onPress, TextColor, icon, disabled ,iconSize}) => {
  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={[styles.button, { backgroundColor: color, opacity: disabled ? 0.7 : 1 }]}
        underlayColor={underlayColor}
        onPress={onPress}
        disabled={disabled}
      >
        <View style={styles.content}>
          {disabled ? (
            <ActivityIndicator size="small" color={TextColor || '#fff'} />
          ) : (
            <>
              {icon && <FontAwesome name={icon} size={iconSize} color={TextColor} style={styles.icon} />}
              <Text style={[styles.buttonText, { color: TextColor }]}>{text}</Text>
            </>
          )}
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20,
  },
  button: {
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CustomButton;
