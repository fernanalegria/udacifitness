import React from 'react';
import { SafeAreaView, View } from 'react-native';
import AddEntry from './app/views/screens/addEntry/AddEntry';
import History from './app/views/screens/History';
import { configureStore } from './app/state/store';
import { Provider } from 'react-redux';
import baseStyles from './app/views/styles';

const reduxStore = configureStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={reduxStore}>
        <SafeAreaView style={[baseStyles.androidSafeArea, { flex: 1 }]}>
          <View style={{ height: 20 }} />
          <History />
        </SafeAreaView>
      </Provider>
    );
  }
}

export default App;
