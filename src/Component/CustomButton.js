import React from 'react';
import { TouchableHighlight, Text, StyleSheet, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CustomButton = ({ text, color, underlayColor, onPress, TextColor, icon }) => {
  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={[styles.button, { backgroundColor: color }]}
        underlayColor={underlayColor}
        onPress={onPress}
      >
        <View style={styles.content}>
          {icon && <FontAwesome name={icon} size={24} color={TextColor} style={styles.icon} />}
          <Text style={[styles.buttonText, { color: TextColor }]}>{text}</Text>
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
