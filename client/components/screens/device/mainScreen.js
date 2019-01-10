import React, {Component} from 'react';
import {View} from 'react-native';
import Header from '../../general/header';


export default class MainScreen extends React.Component {

    render() {
        return (
            <View style={withFooter.screenWrapper}>
                <Header></Header>
                    
            </View>
        )
    }
}