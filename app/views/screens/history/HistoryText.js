import React, { Fragment } from 'react';
import { Text } from 'react-native';
import baseStyles from '../../styles';
import DateHeader from '../../common/DateHeader';

const HistoryText = ({ date, text }) => (
  <Fragment>
    <DateHeader date={date} />
    <Text style={baseStyles.noDataText}>{text}</Text>
  </Fragment>
);

export default HistoryText;
