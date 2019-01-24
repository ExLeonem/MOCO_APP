import React, {Component} from 'react';
import {View, TouchableHighlight, Text, Dimensions, StyleSheet} from 'react-native';

import {CircleIcon} from '../general/icons';
import {snow, arsenic, yellow, green} from '../colors';

import {connect} from 'react-redux';
import {enableDevice, disableDevice, selectCurrentDevice} from '../../store/action/device';
import {setCurrentDevice} from '../../store/action/current_device';


class DeviceEntry extends React.Component {

    changeState() {
        console.log(this.props.isActive);
        if(this.props.isActive) {
            console.log("Disable!");
            this.props.disable(this.props.url);
        } else {
            this.props.enable(this.props.url);
        }
    }

    selectDevice() {
        if(!this.props.selected) {
            this.props.setCurrentDevice(this.props.url);
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={this.props.selected? styles.selected : styles.notSelected}/>
                <TouchableHighlight 
                    style={styles.selectableDevice} 
                    underlayColor={arsenic.hex()} 
                    onPress={() => this.selectDevice()}
                > 
                    <Text style={styles.deviceName}>{this.props.name}</Text>
                </TouchableHighlight>
                <TouchableHighlight 
                    style={styles.turnLight}
                    underlayColor={arsenic.hex()} 
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
        enable: url => dispatch(enableDevice(url)),
        disable: url => dispatch(disableDevice(url)),
        setCurrentDevice: url => dispatch(selectCurrentDevice(url))
    }
}


export default connect(null, mapDispatchToProps)(DeviceEntry);