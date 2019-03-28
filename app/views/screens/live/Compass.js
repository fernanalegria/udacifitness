import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import baseStyles, { colors } from '../../styles';

const Compass = ({ header }) => (
  <View style={baseStyles.center}>
    <Text style={header}>You are heading</Text>
    <Text style={styles.direction}>North</Text>
  </View>
);

const styles = StyleSheet.create({
  direction: {
    color: colors.purple,
    fontSize: 120,
    ...baseStyles.textCenter
  }
});

export default Compass;
