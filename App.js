import React from "react";
import { SafeAreaView } from "react-native";
import AddEntry from "./app/views/screens/AddEntry";
import { configureStore } from "./app/state/store";
import { Provider } from "react-redux";
import baseStyles from "./app/views/styles";

const reduxStore = configureStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={reduxStore}>
        <SafeAreaView style={[baseStyles.androidSafeArea, { flex: 1 }]}>
          <AddEntry />
        </SafeAreaView>
      </Provider>
    );
  }
}

export default App;
