import React, {Component} from 'react';
import {View, TouchableHighlight, Text, Dimensions, StyleSheet} from 'react-native';

import {CircleIcon} from '../general/icons';
import {snow, arsenic, yellow} from '../colors';

import {connect} from 'react-redux';
import {replaceDeviceAddress} from '../../store/action/device';


export default class DeviceEntry extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={this.props.isActive? styles.selected : null}/>
                <TouchableHighlight underlayColor={arsenic.hex()} onPress={() => console.log("")}> 
                    <Text style={styles.deviceName}>{this.props.children}</Text>
                </TouchableHighlight>
                <TouchableHighlight underlayColor={arsenic.hex()} onPress={() => console.log("")}>
                    <CircleIcon color={this.props.isActive? yellow.hex() : snow.hex()}/>
                </TouchableHighlight>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    deviceName: {
        color: snow.hex()
    }
})


const mapDispatchToProps = dispatch => {
    return {
        updateCurrentDevice: device => dispatch()
    }
}