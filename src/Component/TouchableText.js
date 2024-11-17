import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const TouchableText = ({ text, color, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.text, { color }]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom:15
  },
});

export default TouchableText;
