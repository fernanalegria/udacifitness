import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import AddEntry from './components/AddEntry';
import Test from './components/Test';

const test = false;

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>{test ? <Test /> : <AddEntry />}</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 25,
    backgroundColor: '#ecf0f1'
  }
});

export default App;
