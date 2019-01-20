import React, {Component} from 'react';
import {View, Text, BackHandler, StyleSheet} from 'react-native';
import Header from '../../general/header';

import InputField from '../../general/input';
import CircleButton from '../../general/button';
import {arsenic} from '../../colors';

import {connect} from 'react-redux';

import {setNewDeviceAddress, setNewDeviceName} from '../../../store/action/new_device';

class AddDeviceScreen extends React.Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        this.props.switchScreen();
        return true;
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <InputField 
                        label="Device Name" 
                        value={this.props.name} 
                        onChange={name => this.props.setName(name)} 
                        invertColor={true}
                    />
                    
                    <InputField 
                        label="Address" 
                        value={this.props.address} 
                        onChange={address => this.props.setAddress(address)}
                        invertColor={true}    
                    />
                </View>
                <View style={styles.footer}>
                    <CircleButton
                        type="check"
                    />
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: arsenic.hex()
    },
    content: {
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


const mapStateToProps = state => {
    return {
        name: state.newDevice.name,
        address: state.newDevice.address
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setName: name => dispatch(setNewDeviceName(name)),
        setAddress: address => dispatch(setNewDeviceAddress(address))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddDeviceScreen)
