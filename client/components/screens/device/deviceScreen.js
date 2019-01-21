import React, {Component} from 'react';
import {View, Text, Button, ScrollView, TouchableHighlight, StyleSheet} from 'react-native';

import {arsenic, snow} from '../../colors';

import DeviceEntry from '../../device/device_entry';
import Header from '../../general/header';
import CircleButton from '../../general/button';

import {connect} from 'react-redux';
import {initNewDevice} from '../../../store/action/new_device';

class DeviceScreen extends React.Component {

    switchToAddDevice() {
        this.props.initNewDevice();
        this.props.switchScreen();
    }

    renderDevices(devices) {
        return devices.map(device => {
            return <DeviceEntry isActive={device.isActive} address={device.url} name={device.name}/>
        });
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Header 
                    icon="remove" 
                    onPress={() => this.props.onPress()}
                    underlayColor={arsenic.hex()}
                />
                <ScrollView style={styles.deviceList}>
                    {this.renderDevices(this.props.devices)}
                </ScrollView>
                <View style={styles.footer}>
                    <CircleButton buttonColor={snow} onPress={() => this.switchToAddDevice()}/>
                </View>
            </View>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        devices: state.devices
    }
};

const mapDispatchToProps = dispatch => {
    return {
        initNewDevice: () => dispatch(initNewDevice())
    }
}



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



export default connect(mapStateToProps, mapDispatchToProps)(DeviceScreen);


