import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import baseStyles, { colors } from '../styles';

const TextButton = ({ onPress, children, style = {} }) => (
  <TouchableOpacity onPress={onPress} style={style}>
    <Text style={styles.resetText}>{children}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  resetText: {
    ...baseStyles.textCenter,
    color: colors.purple
  }
});

export default TextButton;
