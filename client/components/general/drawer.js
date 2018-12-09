import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NavigationActions} from 'react-navigation';

import {arsenic} from '../colors';
import {RemoveIcon} from './icons';
import {mainRoutes} from '../navigation/routes';


const styles = StyleSheet.create({
    container: {

    },
    removeIcon: {

    }
});


class Drawer extends React.Component {

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
                <RemoveIcon scaleBy={0}></RemoveIcon>
                
            </View>
        );
    }
}

// {navigationKeys.map(this.renderItem)}



export default Drawer;