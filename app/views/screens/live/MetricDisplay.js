import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import baseStyles, { colors } from '../../styles';

const MetricDisplay = ({ header, name, value, unit }) => (
  <View style={styles.metric}>
    <Text style={[header, { color: colors.white }]}>{name}</Text>
    <Text style={[styles.subHeader, { color: colors.white }]}>
      {value} {unit}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  metric: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: colors.whiteShadow,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10
  },
  subHeader: {
    fontSize: 25,
    ...baseStyles.textCenter,
    marginTop: 5
  }
});

export default MetricDisplay;
