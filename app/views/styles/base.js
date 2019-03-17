import { StyleSheet, Platform, StatusBar } from 'react-native';
import { PLATFORM } from '../utils/constants';
import * as colors from './colors';

const textCenter = {
  textAlign: 'center'
};

export default StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textCenter: {
    ...textCenter
  },
  androidSafeArea: {
    paddingTop:
      Platform.OS === PLATFORM.Android ? StatusBar.currentHeight - 18 : 0
  },
  metricCounter: {
    width: 85,
    justifyContent: 'center',
    alignItems: 'center'
  },
  metric: {
    ...textCenter,
    fontSize: 24,
    color: colors.black
  },
  metricUnits: {
    ...textCenter,
    fontSize: 18,
    color: colors.gray
  }
});
