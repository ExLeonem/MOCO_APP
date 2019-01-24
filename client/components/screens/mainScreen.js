import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';

import {arsenic, snow} from '../colors';

import DeviceEntry from '../device/device_entry';
import Header from '../general/header';
import CircleButton from '../general/button';

import {connect} from 'react-redux';
import {initNewDevice} from '../../store/action/new_device';
import {loadDevices} from '../../store/action/device';

class MainScreen extends React.Component {

    constructor(props) {
        super(props);
        this.props.loadDevices();
    }

    switchToAddDevice() {
        this.props.initNewDevice();
        this.props.navigation.navigate('Create');
    }

    renderDevices(devices) {
        if(devices.length > 0 ) {
            return (
                <ScrollView style={styles.deviceList}>
                    {
                        devices.map(device => {
                            return <DeviceEntry 
                                selected={this.props.currentDevice.url == device.url}
                                isActive={device.isActive} 
                                url={device.url} 
                                name={device.name}
                                next={() => this.props.navigation.navigate("Light")}
                            />
                        })
                    }
                </ScrollView>
            ) 
            return ;
        }
        return (
            <View style={styles.displayInfo}>
                <Text style={{color: snow.darken(0.4).hex()}}>Seems like there are any devices...</Text>
                <Text style={{color: snow.darken(0.4).hex()}}>Try to add one.</Text>
            </View>
        )
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Header icon="none"/>
                
                {this.renderDevices(this.props.devices)}
                <View style={styles.footer}>
                    {this.props.devices.length == 0 ? <CircleButton buttonColor={snow} onPress={() => this.switchToAddDevice()}/>: null}
                </View>
            </View>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        devices: state.devices,
        currentDevice: state.currentDevice
    }
};

const mapDispatchToProps = dispatch => {
    return {
        initNewDevice: () => dispatch(initNewDevice()),
        loadDevices: () => dispatch(loadDevices())
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



export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);


