import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { formatDate } from 'utils/helpers';

class EntryDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: formatDate(navigation.getParam('entryId'))
  });
  
  render() {
    return (
      <View>
        <Text>Entry Detail - {this.props.navigation.getParam('entryId')}</Text>
      </View>
    );
  }
}

export default EntryDetail;
