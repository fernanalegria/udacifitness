import React from 'react';
import { View, Platform } from 'react-native';
import AddEntry from './app/views/screens/addEntry/AddEntry';
import History from './app/views/screens/history/History';
import UdaciStatusBar from './app/views/common/UdaciStatusBar';
import { configureStore } from './app/state/store';
import { Provider } from 'react-redux';
import { colors } from './app/views/styles';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  createAppContainer
} from 'react-navigation';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { PLATFORM } from './app/views/utils/constants';

const createTabNavigator = Platform.select({
  [PLATFORM.iOS]: createBottomTabNavigator,
  [PLATFORM.Android]: createMaterialTopTabNavigator
});

const Tabs = createAppContainer(
  createTabNavigator(
    {
      History: {
        screen: History,
        navigationOptions: {
          tabBarLabel: 'History',
          tabBarIcon: ({ tintColor }) => (
            <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
          )
        }
      },
      AddEntry: {
        screen: AddEntry,
        navigationOptions: {
          tabBarLabel: 'Add Entry',
          tabBarIcon: ({ tintColor }) => (
            <FontAwesome name="plus-square" size={30} color={tintColor} />
          )
        }
      }
    },
    {
      tabBarOptions: {
        activeTintColor:
          Platform.OS === PLATFORM.iOS ? colors.purple : colors.white,
        style: {
          height: 56,
          backgroundColor:
            Platform.OS === PLATFORM.iOS ? colors.white : colors.purple,
          shadowRadius: 6,
          shadowOpacity: 1,
          shadowColor: colors.blackShadow,
          shadowOffset: {
            width: 0,
            height: 3
          }
        }
      }
    }
  )
);

const reduxStore = configureStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={reduxStore}>
        <View style={{ flex: 1 }}>
          <UdaciStatusBar backgroundColor={colors.purple} barStyle="light-content" />
          <Tabs />
        </View>
      </Provider>
    );
  }
}

export default App;
