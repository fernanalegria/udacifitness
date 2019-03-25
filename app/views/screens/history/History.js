import React, { Component } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { entryActions } from 'state/entries';
import UdaciFitnessCalendar from 'udacifitness-calendar';
import { colors } from '../../styles';
import { PLATFORM } from '../../utils/constants';
import HistoryText from './HistoryText';
import MetricsSummary from './MetricsCard';
import { AppLoading } from 'expo';

class History extends Component {
  state = {
    isLoading: true
  };

  componentDidMount() {
    this.props.fetchEntries().then(() => {
      this.setState({ isLoading: false });
    });
  }

  renderItem = ({ today, ...metrics }, formattedDate, key) => (
    <View style={styles.item}>
      {today ? (
        <HistoryText date={formattedDate} text={today} />
      ) : (
        <MetricsSummary date={formattedDate} metrics={metrics} />
      )}
    </View>
  );

  renderEmptyDate = formattedDate => (
    <View style={styles.item}>
      <HistoryText
        date={formattedDate}
        text="You didn't log any data on this day."
      />
    </View>
  );

  render() {
    const { entries } = this.props;
    const { isLoading } = this.state;

    if (isLoading) {
      return <AppLoading />;
    }

    return (
      <UdaciFitnessCalendar
        items={entries}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
      />
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: colors.white,
    borderRadius: Platform.OS === PLATFORM.iOS ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    alignItems: 'flex-start',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: colors.blackShadow,
    shadowOffset: {
      width: 0,
      height: 3
    }
  }
});

const mapStateToProps = state => state;

const mapDispatchToProps = {
  fetchEntries: () => entryActions.handleReceiveEntries()
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(History);
