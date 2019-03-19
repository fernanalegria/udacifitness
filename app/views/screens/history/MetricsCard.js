import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { getMetricMetaInfo } from '../../../utils/helpers';
import DateHeader from '../../common/DateHeader';
import baseStyles from '../../styles';

const MetricsCard = ({ metrics, date }) => {
  const metaInfo = getMetricMetaInfo();
  return (
    <TouchableOpacity onPress={() => console.log('Pressed!')}>
      <DateHeader date={date} />
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
    </TouchableOpacity>
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
  },
});

export default MetricsCard;
