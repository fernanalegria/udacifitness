import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { entryActions } from 'state/entries';
import UdaciFitnessCalendar from 'udacifitness-calendar';

class History extends Component {
  componentDidMount() {
    this.props.fetchEntries();
  }

  renderItem = ({ today, ...metrics }, formattedDate, key) => (
    <View>
      <Text>{JSON.stringify(today ? today : metrics)}</Text>
    </View>
  );

  renderEmptyDate = formattedDate => (
    <View>
      <Text>No data for this day</Text>
    </View>
  );

  render() {
    const { entries } = this.props;
    return (
      <UdaciFitnessCalendar
        items={entries}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
      />
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = {
  fetchEntries: () => entryActions.handleReceiveEntries()
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(History);
