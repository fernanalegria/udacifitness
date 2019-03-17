import React from 'react';
import { View, Text, Slider } from 'react-native';
import baseStyles from '../styles';

const UdaciSlider = ({ max, unit, step, value, onChange }) => (
  <View style={baseStyles.row}>
    <Slider
      maximumValue={max}
      minimumValue={0}
      step={step}
      value={value}
      onValueChange={onChange}
      style={{ flex: 1 }}
    />
    <View style={baseStyles.metricCounter}>
      <Text style={baseStyles.metric}>{value}</Text>
      <Text style={baseStyles.metricUnits}>{unit}</Text>
    </View>
  </View>
);

export default UdaciSlider;
