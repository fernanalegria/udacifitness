import React, { Component } from 'react';
import { getMetricMetaInfo, timeToString } from 'utils/helpers';
import ResetView from './ResetView';
import MetricsView from './MetricsView';
import { connect } from 'react-redux';
import { entryActions } from 'state/entries';
import { NavigationActions } from 'react-navigation';

class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0
  };

  increment = metric => {
    const { max, step } = getMetricMetaInfo(metric);
    this.setState(state => {
      const count = state[metric] + step;
      return {
        [metric]: count > max ? max : count
      };
    });
  };

  decrement = metric => {
    this.setState(state => {
      const count = state[metric] - getMetricMetaInfo(metric).step;
      return {
        [metric]: count < 0 ? 0 : count
      };
    });
  };

  slide = (metric, value) => {
    this.setState({
      [metric]: value
    });
  };

  submit = () => {
    const key = timeToString();
    const entry = this.state;

    this.props.addEntry(key, entry);

    this.setState({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0
    });

    this.goToHome();

    // Clear local notification
  };

  reset = () => {
    const key = timeToString();

    this.props.removeEntry(key);

    this.setState({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0
    });

    this.goToHome();
  };

  goToHome = () => {
    this.props.navigation.dispatch(
      NavigationActions.back({
        key: 'AddEntry'
      })
    );
  };

  render() {
    return this.props.alreadyLogged ? (
      <ResetView reset={this.reset} />
    ) : (
      <MetricsView
        metrics={this.state}
        entryFunctions={{
          submit: this.submit,
          slide: this.slide,
          increment: this.increment,
          decrement: this.decrement
        }}
      />
    );
  }
}

const mapStateToProps = ({ entries }) => {
  const key = timeToString();
  return {
    alreadyLogged: entries[key] && typeof entries[key].today === 'undefined'
  };
};

const mapDispatchToProps = {
  addEntry: (key, entry) => entryActions.handleAddEntry(key, entry),
  removeEntry: key => entryActions.handleRemoveEntry(key)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEntry);
