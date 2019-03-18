import React from 'react';
import { View, StyleSheet } from 'react-native';
import UdaciSlider from '../../common/UdaciSlider';
import UdaciStepper from '../../common/UdaciStepper';
import DateHeader from '../../common/DateHeader';
import SubmitButton from '../../common/SubmitButton';
import baseStyles, { colors } from '../../styles';
import { getMetricMetaInfo } from 'utils/helpers';

const MetricsView = ({
  entryFunctions: { submit, slide, increment, decrement },
  metrics
}) => {
  const metaInfo = getMetricMetaInfo();
  return (
    <View style={styles.container}>
      <DateHeader date={new Date().toLocaleDateString()} />
      {Object.keys(metaInfo).map(key => {
        const { getIcon, type, ...rest } = metaInfo[key];
        const value = metrics[key];

        return (
          <View key={key} style={baseStyles.row}>
            {getIcon()}
            {type === 'slider' ? (
              <UdaciSlider
                value={value}
                onChange={val => slide(key, val)}
                {...rest}
              />
            ) : (
              <UdaciStepper
                value={value}
                onIncrement={() => increment(key)}
                onDecrement={() => decrement(key)}
                {...rest}
              />
            )}
          </View>
        );
      })}
      <SubmitButton onPress={submit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white
  }
});

export default MetricsView;
