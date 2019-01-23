import React, {Component} from 'react';
import {View, Text, TouchableHighlight, StyleSheet, Dimensions} from 'react-native';
import {DrawerIcon, AddIcon, RemoveIcon, BackIcon, ArrowIcon} from './icons';
import {header} from '../fonts';

import {snow, arsenic, red} from '../colors';

const {width} = Dimensions.get('screen');

const headStyle = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        maxHeight: 70,
        minHeight: 50,
        paddingLeft: 20,
        paddingRight: 20,
    },
    drawerIconStyle: {
        padding: 10, 
        borderRadius: 50
    },
    title: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: header,
        position: 'absolute',
        width: width,
        zIndex: -1,
        textAlign: 'center'
    }
});


export default class Header extends React.Component {

    renderIcon(icon, iconColor) {
        if(icon == "remove") {
            return <RemoveIcon color={iconColor != undefined? iconColor : snow.hex()} scaleBy={-5}/>;
        } else if(icon == "back") {
            return <BackIcon color={iconColor != undefined? iconColor : snow.hex()}/>
        }
        return <DrawerIcon scaleBy={5}/>;
    }

    renderBackIcon(renderBack, onBack) {
        if(renderBack) {
            return (
                <TouchableHighlight onPress={() => onBack()} underlayColor={snow.hex()}>
                    <ArrowIcon color={arsenic.hex()}/>
                </TouchableHighlight>
            );
        }
        return null;
    }

    renderRemoveIcon(onDelete) {
       return(
            <TouchableHighlight onPress={() => onDelete()} underlayColor={snow.hex()}>
                <RemoveIcon color={red.hex()}/>
            </TouchableHighlight>
       )
    }

    render() {
        return (
            <View style={headStyle.container}>
                <TouchableHighlight 
                    style={headStyle.drawerIconStyle} 
                    onPress={() => this.props.onPress()} 
                    underlayColor={this.props.underlayColor != undefined? this.props.underlayColor : snow.hex()}
                >
                    {this.renderIcon(this.props.icon, this.props.iconColor)}
                </TouchableHighlight>
                <Text style={headStyle.title}>{this.props.children}</Text>
                <View>
                    {this.props.subTask}
                </View>
                {this.renderBackIcon(this.props.back, this.props.onBack)}
                {this.props.delete ? this.renderRemoveIcon(this.props.onDelete) : null}
            </View>
        );
    }
}