import React, {Component} from 'react';
import {View, Text, Button, ScrollView, TouchableHighlight, StyleSheet} from 'react-native';

import {arsenic, snow} from '../../colors';

import DeviceEntry from '../../device/device_entry';
import Header from '../../general/header';
import CircleButton from '../../general/button';

import {connect} from 'react-redux';

class DeviceScreen extends React.Component {
    render() {

        return (
            <View style={styles.container}>
                <Header 
                    icon="remove" 
                    onPress={() => this.props.onPress()}
                    underlayColor={arsenic.hex()}
                />
                <ScrollView style={styles.deviceList}>
                    <DeviceEntry isActive={true}>{"Test Licht"}</DeviceEntry>
                </ScrollView>
                <View style={styles.footer}>
                    <CircleButton buttonColor={snow} onPress={() => this.props.switchScreen()}/>
                </View>
            </View>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {...ownProps};
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: arsenic.hex()
    },
    deviceList: {
        flex: 1,
        // borderWidth: 1,
        // borderColor: snow.hex()
    },
    footer: {
        position: 'relative',
        flex: 0,
        height: 100,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        marginRight: 40 
    }
});



export default connect(mapStateToProps)(DeviceScreen);


