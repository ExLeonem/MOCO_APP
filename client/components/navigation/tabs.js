import React, {Component} from 'react';
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';
import {arsenic, green, snow} from '../colors';
import {small} from '../fonts';

import {createSwitchNavigator} from 'react-navigation';

import InitStackNav from '../screens/navigation';
import ScheduleStackNav from '../screens/schedule/navigation';
import LightScreen from '../screens/light/lightScreen';
import ColorSelectionScreen from '../screens/color/colorSelectionScreen';


class TabItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isActive: this.props.isActive || false
        }
    }
    
    render() {
        return (

            <View style={styles.tabItemContainer}>
                <TouchableHighlight onPress={this.props.onPress} style={styles.outterText} underlayColor={snow.hex()}>
                    <Text style={this.state.isActive? styles.activeText : styles.inactiveText}>{this.props.children}</Text>
                </TouchableHighlight>
                <View style={this.state.isActive? styles.activeTab : styles.inactiveTab}/>
            </View>
        );
    }
}

class TabNavigation extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                {this.props.children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: 40,
        paddingLeft: 10,
        paddingRight: 10,
    },
    tabItem: {
        flex: 1,
        alignSelf: 'stretch'
    },
    inactiveTab: {
        flex: 1
    },
    activeTab: {
        flex: 1,
        borderRadius: 100,
        backgroundColor: green.hex()
    },
    tabItemContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    outterText: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },  
    activeText: {
        color: arsenic.hex(),
        fontSize: small
    },
    inactiveText: {
        color: arsenic.lighten(0.6).hex(),
        fontSize: small
    }
});




let GeneralOperationTabs = createSwitchNavigator({
    Main: InitStackNav,
    Light: {screen: LightScreen},
    Color: {screen: ColorSelectionScreen},
    Schedule: {screen: ScheduleStackNav}
}, {
    initialRouteName: 'Main'
});

export {
    GeneralOperationTabs,
    TabNavigation,
    TabItem
}