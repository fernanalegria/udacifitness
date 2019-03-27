import React from 'react';
import { TouchableOpacity } from 'react-native';
import DateHeader from '../../common/DateHeader';
import MetricsInfo from '../../common/MetricsInfo';

const MetricsCard = ({ metrics, date, navigation, entryId }) => (
  <TouchableOpacity
    onPress={() => navigation.navigate('EntryDetail', { entryId })}
  >
    <DateHeader date={date} />
    <MetricsInfo metrics={metrics} />
  </TouchableOpacity>
);

export default MetricsCard;
