import React, {Component} from 'react';
import {View, Text, Button, ScrollView, TouchableHighlight, StyleSheet} from 'react-native';

import {arsenic, snow} from '../colors';
import {RemoveIcon, AddIcon} from './icons';
import {DeviceEntry} from '../device/device_entry';

class Drawer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    
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



export default Drawer;