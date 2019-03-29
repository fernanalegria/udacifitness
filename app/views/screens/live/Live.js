import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import baseStyles, { colors } from '../../styles';
import LocationDenied from './LocationDenied';
import LocationUndetermined from './LocationUndetermined';
import Compass from './Compass';
import MetricDisplay from './MetricDisplay';
import { Location, Permissions } from 'expo';
import { calculateDirection } from 'utils/helpers';
import { STATUS_TYPE } from '../../utils/constants';

class Live extends Component {
  state = {
    coords: null,
    status: STATUS_TYPE.undetermined,
    direction: ''
  };

  componentDidMount() {
    Permissions.getAsync(Permissions.LOCATION)
      .then(this.onGetLocation)
      .catch(this.handleLocationError);
  }

  onGetLocation = ({ status }) => {
    if (status === STATUS_TYPE.granted) {
      this.setLocation();
    } else {
      this.setState({ status });
    }
  };

  handleLocationError = error => {
    console.warn('Error getting Location permission: ', error);
    this.setState({ status: STATUS_TYPE.undetermined });
  };

  setLocation = () => {
    Location.watchPositionAsync(
      {
        enableHighAccuracy: true,
        timeInterval: 1,
        distanceInterval: 1
      },
      ({ coords }) => {
        const direction = calculateDirection(coords.heading);
        this.setState({
          coords,
          status: STATUS_TYPE.granted,
          direction
        });
      }
    );
  };

  askForPermission = () => {
    Permissions.askAsync(Permissions.LOCATION)
      .then(this.onGetLocation)
      .catch(this.handleLocationError);
  };

  render() {
    const { coords, status, direction } = this.state;
    const { denied, undetermined, granted } = STATUS_TYPE;

    switch (status) {
      case null:
        return <ActivityIndicator style={{ marginTop: 30 }} />;
      case denied:
        return <LocationDenied center={styles.center} />;
      case undetermined:
        return (
          <LocationUndetermined
            center={styles.center}
            askForPermission={this.askForPermission}
          />
        );
      case granted:
      default:
        return (
          <View style={styles.container}>
            <Compass header={styles.header} direction={direction} />
            <View style={styles.metricContainer}>
              <MetricDisplay
                header={styles.header}
                name="Altitude"
                value={Math.round(coords.altitude)}
                unit="m"
              />
              <MetricDisplay
                header={styles.header}
                name="Speed"
                value={(coords.speed * 3.6).toFixed(1)}
                unit="km/h"
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
