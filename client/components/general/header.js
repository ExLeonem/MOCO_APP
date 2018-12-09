import React, {Component} from 'react';
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';
import {DrawerIcon, AddIcon} from './icons';
import MainNavigation from '../navigation/navigator';

const headStyle = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        maxHeight: 50,
        minHeight: 50,
        paddingLeft: 10,
        paddingRight: 10,
    },
    title: {
        fontSize: 12,
    }
});


export default class Header extends React.Component {

    render() {
        return (
            <View style={headStyle.container}>
                <TouchableHighlight onPress={() => console.log("what")} underlayColor={'white'}>
                    <DrawerIcon scaleBy={5}/>                    
                </TouchableHighlight>
                <Text style={headStyle.title}>{this.props.children}</Text>
                <View>
                    {this.props.subTask}
                </View>
            </View>
        );
    }
}