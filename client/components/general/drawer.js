import React, {Component} from 'react';
import {View, Text, Button, ScrollView, TouchableHighlight, StyleSheet} from 'react-native';
import {NavigationActions} from 'react-navigation';

import {arsenic, snow} from '../colors';
import {RemoveIcon} from './icons';
import {mainRoutes} from '../navigation/routes';


const DeviceItem = () => {
    return (
        <View>
            <Text>Device Name
                <Text>connect</Text>
            </Text>
        </View>
    )
}


class Drawer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    navigateToScreen = (route) => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    }

    renderItem = (screenName) =>{
        return (
            <Text onPress={this.navigateToScreen(screenName)}>
                {screenName.charAt(0).toUpperCase() + screenName.slice(1)}
            </Text>
        );
    }

    render() {
        let navigationKeys = Object.keys(mainRoutes);
        console.log("Keys");
        console.log(navigationKeys);
        return (
            <View style={styles.container}>
                <View style={styles.removeIcon}>
                    <TouchableHighlight onPress={() => {console.log("Close drawer")}} underlayColor={arsenic.hex()}>
                        <RemoveIcon scaleBy={0} color={snow.hex()}></RemoveIcon>
                    </TouchableHighlight>
                </View>

                <View style={styles.searchForDevices}>
                    <Button style={styles.buttonStyle} title={"Search..."} onPress={() => console.log("searach for devices")}/>
                    <View style={styles.horizontalLine}/>
                </View>
             
                <ScrollView>
                    {/*Scan for Lamp devices and list them */}
                </ScrollView>
            </View>
        );
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

    },
    removeIcon: {
        flex: 0,
        paddingTop: 20,
        paddingLeft: 20,
    },
    searchForDevices: {
        flex: 0,
        paddingTop: 30,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
    },
    buttonStyle: {
        backgroundColor: snow.hex()
    },
    searchButton: {
        color: arsenic.hex(),
        backgroundColor: snow.hex(),
    },
    horizontalLine: {
        marginTop: 20,
        borderBottomColor: arsenic.lighten(0.6).hex(),
        borderBottomWidth: 2
    }
});

// {navigationKeys.map(this.renderItem)}



export default Drawer;