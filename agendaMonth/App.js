import 'react-native-gesture-handler';

enableScreens();

import React from 'react';
import {enableScreens} from 'react-native-screens';

import Navigator from './src/MainNavigation';

const App = () => {
  return (
      <Navigator />
  );
};

export default App;