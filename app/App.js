import React, {Component} from 'react';
import {
  Text,
} from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import { StackNavigator, TabNavigator } from 'react-navigation';

import LogIn from './screens/LogIn';
import Measures from './screens/Measures';
import Companies from './screens/Companies';
import { apiMiddleware, reducer } from './files/redux';

// Create Redux store
const store = createStore(reducer, {}, applyMiddleware(apiMiddleware));

// // Fetch measure data (and user but at the moment no user data is imported)
store.dispatch({type: 'GET_MEASURE_DATA'});
store.dispatch({type: 'GET_USER_DATA'});

// Navigator with the three screens
const HallmarkAppFront = StackNavigator({
  LogIn: { screen: LogIn },
  Companies: { screen: Companies },
  Measures: { screen: Measures },
  },
  {
    navigationOptions: {
      headerStyle: {
        height: 50,
        backgroundColor: '#CCCCCC',
      },
    }
  }
);

// Wraps the navigator in the redux so all screens have access to redux
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HallmarkAppFront/>
      </Provider>
    );
  }
}
