import React, {Component} from 'react';
import {View, Text, Button, ScrollView, TouchableHighlight, StyleSheet} from 'react-native';

import {arsenic, snow} from '../colors';

import DeviceEntry from '../device/device_entry';
import Header from './header';

import {connect} from 'react-redux';

class Drawer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {

        return (
            <View style={styles.container}>
                <Header 
                    icon="remove" 
                    onPress={() => this.props.navigation.closeDrawer()}
                    underlayColor={arsenic.hex()}
                />
                <ScrollView>
                    <DeviceEntry isActive={true}>{"Test Licht"}</DeviceEntry>
                </ScrollView>
            </View>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {...ownProps};
};

const mapDispatchToProps = (dispatch, ownProps) => {
    
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: arsenic.hex()

    }
});

// {navigationKeys.map(this.renderItem)}



export default connect(mapStateToProps)(Drawer);