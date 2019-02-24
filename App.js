import React from 'react';
import { View } from 'react-native';
import AddEntry from './components/AddEntry';
import Test from './components/Test';

const test = false;

class App extends React.Component {
  render() {
    return (
      <View>
        {test ? <Test /> : <AddEntry />}
      </View>
    );
  }
}

export default App;
