import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  getMetricMetaInfo,
  timeToString,
  getDailyReminderValue
} from '../utils/helpers';
import UdaciSlider from '../common/UdaciSlider';
import UdaciStepper from '../common/UdaciStepper';
import DateHeader from '../common/DateHeader';
import SubmitButton from '../common/SubmitButton';
import { Ionicons } from '@expo/vector-icons';
import TextButton from '../common/TextButton';
import { submitEntry, removeEntry } from '../../server/api';
import { connect } from 'react-redux';
import { entryActions } from '../../state/ducks/entries';
import baseStyles, { colors } from '../styles';

class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0
  };

  increment = metric => {
    const { max, step } = getMetricMetaInfo(metric);
    this.setState(state => {
      const count = state[metric] + step;
      return {
        [metric]: count > max ? max : count
      };
    });
  };

  decrement = metric => {
    this.setState(state => {
      const count = state[metric] - getMetricMetaInfo(metric).step;
      return {
        [metric]: count < 0 ? 0 : count
      };
    });
  };

  slide = (metric, value) => {
    this.setState({
      [metric]: value
    });
  };

  submit = () => {
    const key = timeToString();
    const entry = this.state;

    this.props.addEntry({
      [key]: entry
    });

    this.setState({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0
    });

    // Navigate to Home

    submitEntry(key, entry);

    // Clear local notification
  };

  reset = () => {
    const key = timeToString();

    this.props.addEntry({
      [key]: getDailyReminderValue()
    });

    // Route to Home

    removeEntry(key);

    this.setState({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0
    });
  };

  render() {
    const metaInfo = getMetricMetaInfo();

    return this.props.alreadyLogged ? (
      <View style={[baseStyles.center, styles.marginWidth]}>
        <Ionicons name="md-happy" size={100} />
        <Text>You already logged your information for today</Text>
        <TextButton onPress={this.reset} style={{ padding: 10 }}>
          Reset
        </TextButton>
      </View>
    ) : (
      <View style={styles.container}>
        <DateHeader date={new Date().toLocaleDateString()} />
        {Object.keys(metaInfo).map(key => {
          const { getIcon, type, ...rest } = metaInfo[key];
          const value = this.state[key];

          return (
            <View key={key} style={baseStyles.row}>
              {getIcon()}
              {type === 'slider' ? (
                <UdaciSlider
                  value={value}
                  onChange={val => this.slide(key, val)}
                  {...rest}
                />
              ) : (
                <UdaciStepper
                  value={value}
                  onIncrement={() => this.increment(key)}
                  onDecrement={() => this.decrement(key)}
                  {...rest}
                />
              )}
            </View>
          );
        })}
        <SubmitButton onPress={this.submit} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white
  },
  marginWidth: {
    marginRight: 30,
    marginLeft: 30
  }
});

const mapStateToProps = ({ entries }) => {
  const key = timeToString();
  return {
    alreadyLogged: entries[key] && typeof entries[key].today === 'undefined'
  };
};

const mapDispatchToProps = {
  addEntry: entry => entryActions.addEntry(entry)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEntry);
