import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TextButton from '../../common/TextButton';
import { Ionicons } from '@expo/vector-icons';
import baseStyles from '../../styles';

const ResetView = ({ reset }) => (
  <View style={[baseStyles.center, styles.marginWidth]}>
    <Ionicons name="md-happy" size={100} />
    <Text>You already logged your information for today</Text>
    <TextButton onPress={reset} style={{ padding: 10 }}>
      Reset
    </TextButton>
  </View>
);

const styles = StyleSheet.create({
  marginWidth: {
    marginRight: 30,
    marginLeft: 30
  }
});

export default ResetView;
