import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import baseStyles, { colors } from '../../styles';
import { Foundation } from '@expo/vector-icons';

const LocationUndetermined = ({ askForPermission, center }) => (
  <View style={center}>
    <Foundation name="alert" size={50} />
    <Text style={baseStyles.textCenter}>
      You need to enable location services for this app.
    </Text>
    <TouchableOpacity onPress={askForPermission} style={styles.button}>
      <Text style={styles.buttonText}>Enable</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: colors.purple,
    alignSelf: 'center',
    borderRadius: 5,
    margin: 20
  },
  buttonText: {
    color: colors.white,
    fontSize: 20
  }
});

export default LocationUndetermined;
