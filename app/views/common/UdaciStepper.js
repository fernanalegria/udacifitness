import React, { Fragment } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import baseStyles, { colors } from '../styles';
import { PLATFORM } from '../utils/constants';

const UdaciStepper = ({ unit, value, onIncrement, onDecrement }) => (
  <View style={[baseStyles.row, { justifyContent: 'space-between' }]}>
    <View style={{ flexDirection: 'row' }}>
      {Platform.OS === PLATFORM.iOS ? (
        <Fragment>
          <TouchableOpacity onPress={onDecrement} style={styles.iosLeftBtn}>
            <Entypo name="minus" size={30} color={colors.purple} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onIncrement} style={styles.iosRightBtn}>
            <Entypo name="plus" size={30} color={colors.purple} />
          </TouchableOpacity>
        </Fragment>
      ) : (
        <Fragment>
          <TouchableOpacity onPress={onDecrement} style={styles.androidBtn}>
            <FontAwesome name="minus" size={30} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onIncrement} style={styles.androidBtn}>
            <FontAwesome name="plus" size={30} color={colors.white} />
          </TouchableOpacity>
        </Fragment>
      )}
    </View>
    <View style={baseStyles.metricCounter}>
      <Text style={baseStyles.metric}>{value}</Text>
      <Text style={baseStyles.metricUnits}>{unit}</Text>
    </View>
  </View>
);

const iosBtn = {
  backgroundColor: colors.white,
  borderColor: colors.purple,
  borderWidth: 1,
  borderRadius: 3,
  padding: 5,
  paddingLeft: 25,
  paddingRight: 25
};

const styles = StyleSheet.create({
  iosLeftBtn: {
    ...iosBtn,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRightWidth: 0
  },
  iosRightBtn: {
    ...iosBtn,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  },
  androidBtn: {
    backgroundColor: colors.purple,
    borderRadius: 2,
    margin: 5,
    padding: 10
  }
});

export default UdaciStepper;
