import React from 'react';
import { Text } from 'react-native';
import { colors } from '../styles';

const DateHeader = ({ date }) => (
  <Text style={{ color: colors.purple, fontSize: 25 }}>{date}</Text>
);

export default DateHeader;
