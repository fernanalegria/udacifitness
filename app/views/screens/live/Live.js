import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import baseStyles, { colors } from '../../styles';
import LocationDenied from './LocationDenied';
import LocationUndetermined from './LocationUndetermined';
import Compass from './Compass';
import MetricDisplay from './MetricDisplay';

class Live extends Component {
  state = {
    coords: null,
    status: 'granted',
    direction: ''
  };

  render() {
    const { coords, status, direction } = this.state;

    switch (status) {
      case null:
        return <ActivityIndicator style={{ marginTop: 30 }} />;
      case 'denied':
        return <LocationDenied center={styles.center} />;
      case 'undetermined':
        return <LocationUndetermined center={styles.center} />;
      default:
        return (
          <View style={styles.container}>
            <Compass header={styles.header} />
            <View style={styles.metricContainer}>
              <MetricDisplay
                header={styles.header}
                name="Altitude"
                value={200}
                unit="feet"
              />
              <MetricDisplay
                header={styles.header}
                name="Speed"
                value={300}
                unit="MPH"
              />
            </View>
          </View>
        );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  center: {
    ...baseStyles.center,
    marginLeft: 30,
    marginRight: 30
  },
  header: {
    color: colors.black,
    fontSize: 35,
    ...baseStyles.textCenter
  },
  metricContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.purple
  }
});

export default Live;
