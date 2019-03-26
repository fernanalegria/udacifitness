import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { formatDate } from 'utils/helpers';
import { connect } from 'react-redux';
import MetricsCard from '../history/MetricsCard';
import TextButton from '../../common/TextButton';
import baseStyles from '../../styles';
import { entryActions } from 'state/entries';

class EntryDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: formatDate(navigation.getParam('entryId'))
  });

  reset = () => {
    const { reset, goBack } = this.props;
    reset();
    goBack();
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.metrics && !nextProps.metrics.today;
  }

  render() {
    const { metrics } = this.props;
    return (
      <View style={styles.container}>
        <MetricsCard metrics={metrics} />
        <TextButton onPress={this.reset}>RESET</TextButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...baseStyles.container,
    padding: 15
  }
});

const mapStateToProps = ({ entries }, { navigation }) => {
  const entryId = navigation.getParam('entryId');
  return {
    entryId,
    metrics: entries[entryId]
  };
};

const mapDispatchToProps = (dispatch, { navigation }) => ({
  reset: () =>
    dispatch(entryActions.handleRemoveEntry(navigation.getParam('entryId'))),
  goBack: () => navigation.goBack()
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EntryDetail);
