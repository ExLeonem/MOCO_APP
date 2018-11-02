/** @format */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
// import App from './App';
import {name as appName} from './app.json';
import { RustLib } from 'NativeModules';

async function displayGreeting(self) {
    try {
        let text = await RustLib.greeting("Test")
        self.setState({
            hello: text
        })
    } catch (e) {
        console.log(e)
    }
}

export default class mobile_app extends Component {
    state = {}

    componentDidMount () {
        displayGreeting(this)
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    rust says: {this.state.hello}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent(appName, () => App);
