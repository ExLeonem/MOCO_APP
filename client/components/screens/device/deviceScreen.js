import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Header from '../../general/header';

import DeviceEntry from '../../device/device_entry';


export default class DeviceScreen extends React.Component {

    render() {
        return (
            <View style={withFooter.screenWrapper}>
                <Header>
                    
                </Header>
                <View>

                    <Text>Hello</Text>
                </View>
                    
            </View>
        )
    }
}