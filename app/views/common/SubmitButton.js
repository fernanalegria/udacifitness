import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const SubmitButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text>SUBMIT</Text>
  </TouchableOpacity>
);

export default SubmitButton;
