import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Header from '../general/header';
import Schedule from './schedule';
import CircleButton from '../general/button';
import {createStackNavigator} from 'react-navigation';

export default class ScheduleScreen extends React.Component {
    render() {
        return (
            <View style={styles.screenWrapper}>
                <Header>Device Name</Header>
                <Schedule style={styles.scheduleList}/>
                <View style={styles.footer}>
                    <CircleButton type={'add'} size={60} onPress={() => console.log("redirect")}/>
                </View>
            </View>
        );
    };
}


const styles = StyleSheet.create({
    screenWrapper: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'stretch',
    },
    scheduleList: {
        flex: 1,
    },
    footer: {
        position: 'relative',
        flex: 0,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

