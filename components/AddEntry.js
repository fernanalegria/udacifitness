import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { getMetricMetaInfo, timeToString } from '../utils/helpers';
import UdaciSlider from './common/UdaciSlider';
import UdaciStepper from './common/UdaciStepper';
import DateHeader from './common/DateHeader';
import SubmitButton from './common/SubmitButton';
import { Ionicons } from '@expo/vector-icons';
import TextButton from './common/TextButton';
import { submitEntry, removeEntry } from '../utils/api';

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

    // Update Redux

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

    // Update Redux

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
      <View>
        <Ionicons name="md-happy" size={100} />
        <Text>You already logged your information for today</Text>
        <TextButton onPress={this.reset}>Reset</TextButton>
      </View>
    ) : (
      <View>
        <DateHeader date={new Date().toLocaleDateString()} />
        {Object.keys(metaInfo).map(key => {
          const { getIcon, type, ...rest } = metaInfo[key];
          const value = this.state[key];

          return (
            <View key={key}>
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

export default AddEntry;
