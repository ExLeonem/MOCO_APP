import React, {Component} from 'react';
import {View, Text, BackHandler, Dimensions, StyleSheet} from 'react-native';
import Header from '../../general/header';

import InputField from '../../general/input';
import CircleButton from '../../general/button';
import {arsenic, snow} from '../../colors';
import {medium} from '../../fonts';

import {connect} from 'react-redux';

import {setNewDeviceAddress, setNewDeviceName, addNewDevice} from '../../../store/action/new_device';

const {width} = Dimensions.get('screen');

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
                <Header
                    icon="back"
                    onPress={() => this.props.switchScreen()}
                    underlayColor={arsenic.hex()}
                />
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
                        <Text style={styles.errorMessage}>{this.props.errorMessage}</Text>
                </View>
                <View style={styles.footer}>
                    <CircleButton
                        type="check"
                        onPress={() => this.props.addDevice(this.props.name, this.props.address)}
                    />
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: arsenic.hex(),
        flexDirection: 'column',
        alignSelf: 'stretch',
    },
    content: {
        flex: 1
    },
    footer: {
        position: 'relative',
        flex: 0,
        height: 100,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        marginRight: 40
    },
    errorMessage: {
        marginTop: 20,
        color: snow.darken(0.4).hex(),
        fontSize: medium,
        textAlign: 'center'
    }
});


const mapStateToProps = state => {
    return {
        name: state.newDevice.name,
        address: state.newDevice.address,
        errorMessage: state.newDevice.message
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setName: name => dispatch(setNewDeviceName(name)),
        setAddress: address => dispatch(setNewDeviceAddress(address)),
        addDevice: (name, address) => dispatch(addNewDevice(name, address))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddDeviceScreen)
