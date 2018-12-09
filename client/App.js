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

import Header from './components/general/header';
import Drawer from './components/general/drawer';

// import ScheduleScreen from './components/schedule/screen';
import {DrawerIcon} from './components/general/icons';


import {AppNavigator} from './components/navigation/navigator';



export default class App extends Component {
  render() {
    return (
        <AppNavigator/> 
    );
  }
}
