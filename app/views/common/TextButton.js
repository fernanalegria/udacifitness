import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const TextButton = ({ onPress, children }) => (
  <TouchableOpacity onPress={onPress}>
    <Text>{children}</Text>
  </TouchableOpacity>
);

export default TextButton;
