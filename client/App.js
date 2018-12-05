/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import Schedule from './components/schedule/screen';
import {Provider} from 'react-redux';
import store from './components/store/index';


export default class App extends Component {

  constructor(props) {
    super(props);

  }

  
  render() {
    return (
      <Provider store={store}>
        <Schedule/>
      </Provider>
    );
  }
}
