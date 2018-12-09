import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import Header from '../general/header';
import ScheduleScreen from '../schedule/screen';


import {Provider} from 'react-redux';
import store from '../store/index';


class DevicesScreen extends React.Component {
    static navigationOptions = {
        title: "Devices",

    }

    render() {
        return (
            <Provider store={store}>
                <View>
                    <Header title={"Devices"}/>
                    <ScheduleScreen/>
                </View>
            </Provider>
        );
    }
}

export default DevicesScreen;