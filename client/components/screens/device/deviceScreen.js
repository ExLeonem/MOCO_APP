import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';

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
        if(devices.length > 0 ) {
            return (
                <ScrollView style={styles.deviceList}>
                    {
                        devices.map(device => {
                            return <DeviceEntry isActive={device.isActive} address={device.url} name={device.name}/>
                        })
                    }
                </ScrollView>
            ) 
            return ;
        }
        return (
            <View style={styles.displayInfo}>
                <Text style={{color: snow.darken(0.4).hex()}}>Currently there are any devices registered.</Text>
            </View>
        )
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Header 
                    icon="remove" 
                    onPress={() => this.props.onPress()}
                    underlayColor={arsenic.hex()}
                />
                
                {this.renderDevices(this.props.devices)}
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
    displayInfo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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


