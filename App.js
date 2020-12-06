import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './screens/WelcomeScreen';
import {AppDrawerNavigator} from './components/AppDrwaerNavigator'
import {createAppContainer,createSwitchNavigator} from 'react-navigation';

export default function App() {
  return (
    <Appcontainer/>
  );
}
const SwitchNavigator = createSwitchNavigator({
  WelcomeScreen:WelcomeScreen,
  Drawer:AppDrawerNavigator
})
const Appcontainer = createAppContainer(SwitchNavigator);