import React, {Component} from 'react';
import {View, Text} from 'react-native';

import DeviceScreen from './deviceScreen';
import AddDeviceScreen from './addDeviceScreen';

import {connect} from 'react-redux';
import {setDrawerShow, setDrawerAdd} from '../../../store/action/drawer';




class DevicesDrawer extends React.Component {

    render() {
        if(this.props.screenState == "show") {
            return <DeviceScreen onPress={() => this.props.navigation.closeDrawer()} switchScreen={() => this.props.setAdd()}/>
        }
        return <AddDeviceScreen switchScreen={() => this.props.setShow()}/>
    }
}


const mapStateToProps = state => {
    return {
        screenState: state.drawer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setShow: () => dispatch(setDrawerShow()),
        setAdd: () => dispatch(setDrawerAdd())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DevicesDrawer);