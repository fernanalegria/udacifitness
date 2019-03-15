import React from 'react';
import { View, StyleSheet } from 'react-native';
import AddEntry from './app/views/screens/AddEntry';
import Test from './app/views/screens/Test';
import { configureStore } from './app/state/store';
import { Provider } from 'react-redux';

const test = false;
const reduxStore = configureStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={reduxStore}>
        <View style={styles.container}>{test ? <Test /> : <AddEntry />}</View>
      </Provider>
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
