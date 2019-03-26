import React, { Fragment } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getMetricMetaInfo } from '../../utils/helpers';
import baseStyles from '../styles';

const MetricsInfo = ({ metrics }) => {
  const metaInfo = getMetricMetaInfo();
  return (
    <Fragment>
      {Object.keys(metrics)
        .sort((a, b) => metaInfo[a].order - metaInfo[b].order)
        .map(metric => {
          const { displayName, unit, getIcon } = metaInfo[metric];
          return (
            <View style={styles.metricRow} key={metric}>
              {getIcon()}
              <View style={styles.metric}>
                <Text style={[baseStyles.metric, { fontSize: 20 }]}>
                  {displayName}
                </Text>
                <Text style={[baseStyles.metricUnits, { fontSize: 16 }]}>
                  {metrics[metric]} {unit}
                </Text>
              </View>
            </View>
          );
        })}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  metricRow: {
    flexDirection: 'row',
    marginTop: 12
  },
  metric: {
    justifyContent: 'center',
    alignItems: 'flex-start'
  }
});

export default MetricsInfo;
