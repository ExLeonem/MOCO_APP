import React, {Component} from 'react';
import {View, TouchableHighlight, Text, Dimensions, StyleSheet} from 'react-native';

import {CircleIcon} from '../general/icons';
import {snow, arsenic, yellow, green} from '../colors';

import {connect} from 'react-redux';
import {enableDevice, disableDevice} from '../../store/action/device';
import {setCurrentDevice} from '../../store/action/current_device';


class DeviceEntry extends React.Component {

    changeState() {
        if(this.props.isActive) {
            this.props.disable(this.props.address);
        } else {
            this.props.enable(this.props.address);
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={this.props.isActive? styles.selected : styles.notSelected}/>
                <TouchableHighlight 
                    style={styles.selectableDevice} 
                    underlayColor={arsenic.hex()} 
                    onPress={() => this.props.setCurrentDevice(this.props.name)}
                > 
                    <Text style={styles.deviceName}>{this.props.name}</Text>
                </TouchableHighlight>
                <TouchableHighlight 
                    style={styles.turnLight}
                    underlayColor={arsenic.lighten(0.6).hex()} 
                    onPress={() => this.changeState()}
                >
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
        justifyContent: 'center',
        alignContent: 'stretch',
        alignItems: 'center',
        height: 50,
        paddingHorizontal: 20,
        marginVertical: 25,
        borderWidth: 1,
        borderColor: snow.hex()
    },
    selected: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        paddingLeft: 15,
        borderLeftColor: green.hex(),
        borderLeftWidth: 3.5
    },
    notSelected: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        paddingLeft: 15,
        borderColor: arsenic.hex(),
        borderLeftWidth: 3.5
    },
    selectableDevice: {
        flex: 5
    },
    turnLight: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    deviceName: {
        color: snow.hex()
    }
});

const mapDispatchToProps = dispatch => {
    return {
        enable: name => dispatch(enableDevice(name)),
        disable: name => dispatch(disableDevice(name)),
        setCurrentDevice: name => dispatch(setCurrentDevice(name))
    }
}


export default connect(null, mapDispatchToProps)(DeviceEntry);