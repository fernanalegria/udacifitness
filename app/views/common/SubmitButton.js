import React from 'react';
import { Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { purple, white } from '../styles/colors';
import { PLATFORM } from '../utils/constants';

const SubmitButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.submitBtn}>
    <Text style={styles.submitBtnText}>SUBMIT</Text>
  </TouchableOpacity>
);

const submitBtn = {
  backgroundColor: purple,
  padding: 10,
  height: 45,
  justifyContent: 'center',
  alignItems: 'center'
};

export const styles = StyleSheet.create({
  submitBtn: Platform.select({
    [PLATFORM.iOS]: {
      ...submitBtn,
      borderRadius: 7,
      marginLeft: 40,
      marginRight: 40
    },
    [PLATFORM.Android]: {
      ...submitBtn,
      borderRadius: 2,
      marginLeft: 30,
      marginRight: 30,
      alignSelf: 'flex-end'
    }
  }),
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  }
});

export default SubmitButton;
