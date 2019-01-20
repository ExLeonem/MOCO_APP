/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import {createMaterialTopTabNavigator, createDrawerNavigator, createAppContainer, createStackNavigator, DrawerNavigator} from 'react-navigation';

import store from './store/index';
import {Provider} from 'react-redux';
import {AppNavigator} from './components/navigation/navigator';



export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator/>
      </Provider>
    );
  }
}
