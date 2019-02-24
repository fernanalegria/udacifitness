import * as React from 'react';
import { Text, View, StyleSheet, Slider } from 'react-native';

export default class App extends React.Component {
  state = {
    value: 0
  };

  onValueChange = value => {
    this.setState({
      value
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Slider
          minimumValue={-10}
          maximumValue={10}
          step={1}
          value={this.state.value}
          onValueChange={this.onValueChange}
        />
        <Text>Value: {this.state.value}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 300,
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  btn: {
    backgroundColor: '#E53224',
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  btnText: {
    color: '#fff'
  }
});
