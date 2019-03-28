import React from 'react';
import { View, Text } from 'react-native';
import baseStyles from '../../styles';
import { Foundation } from '@expo/vector-icons';

const LocationDenied = ({ center }) => (
  <View style={center}>
    <Foundation name="alert" size={50} />
    <Text style={baseStyles.textCenter}>
      You denied your location. You can fix this by visiting your settings and
      enabling location services for this app.
    </Text>
  </View>
);

export default LocationDenied;
