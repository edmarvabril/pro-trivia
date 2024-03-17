/**
 * Trivia Quiz App
 * Created for Pro-Solutions Technology
 * Created by Edmarv Allen Abril
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './app/navigation/StackNavigator';
import {Provider} from 'react-redux';

import store from './app/redux/store';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
