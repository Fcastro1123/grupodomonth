import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import InitialPage from './initialPage';
import agendaNew from '../src/agendaNew';


const Stack = createStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="InitialPage">
        {/* <Stack.Screen name="loginPage" component={loginPage} options={{ headerShown: false }} /> */}
        <Stack.Screen name="InitialPage" component={InitialPage} options={{ headerShown: false }} />
        <Stack.Screen name="agendaNew" component={agendaNew} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};