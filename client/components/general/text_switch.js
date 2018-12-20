import React, {Component} from 'react';
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';

import {blue, arsenic, snow} from '../colors';
import {medium} from '../fonts';

/**
 * Properties:
 *  label -> header
 *  left -> left string value
 *  right -> right string value
 *  onChange -> function that takes 1 parameter (new )
 */
export default class TextSwitch extends React.Component {
    
    equal(current, actual) {
        return this.toLower(current) == this.toLower(actual);
    }

    notEqual(current, actual) {
        return this.toLower(current) != this.toLower(actual);
    }

    toLower(value) {
        return value.toLowerCase();
    }

    change(current, active, next) {
        return this.notEqual(current, active)? this.toLower(active):this.toLower(current); 
    }


    setStyle(baseStyle, current, compareTo) {
        let additionalStyle = this.equal(current, compareTo)? styles.active:styles.inactive;
        return {...baseStyle, ...additionalStyle}
    }

    setTabFontStyle(current, active) {
        return this.equal(current, active)? styles.activeFont:styles.inactiveFont;
    }

    setUnderlayColor(current, active) {
        return this.equal(current, active)? blue.lighten(0.2).hex(): snow.darken(0.2).hex();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>{this.props.label}</Text>
                <View style={styles.switchBoxContent}>
                    <TouchableHighlight 
                        style={this.setStyle(styles.leftTab, this.props.current, this.props.left)}
                        onPress={() => this.props.onChange(this.change(this.props.current, this.props.left, this.props.right))}
                        underlayColor={this.setUnderlayColor(this.props.current, this.props.left)}
                    >
                        <Text style={this.setTabFontStyle(this.props.current, this.props.left)}>
                            {this.props.left}
                        </Text>
                    </TouchableHighlight>

                    <TouchableHighlight 
                        style={this.setStyle(styles.rightTab, this.props.current, this.props.right)}
                        onPress={() => this.props.onChange(this.change(this.props.current, this.props.right, this.props.left))}
                        underlayColor={this.setUnderlayColor(this.props.current, this.props.right)}
                    >
                        <Text style={this.setTabFontStyle(this.props.current, this.props.right)}>
                            {this.props.right}
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: 100,
        marginHorizontal: 40,
        marginVertical: 10,
    },
    leftTab: {
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25
    },
    rightTab: {
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25
    },
    active: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        backgroundColor: blue.hex(),
    },
    inactive: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        backgroundColor: snow.hex()
    },
    activeFont: {
        color: snow.hex(),
        fontSize: medium
    },
    inactiveFont: {
        color: arsenic.lighten(0.6).hex(),
        fontSize: medium
    },
    switchBoxContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: medium,
        color: arsenic.lighten(0.6).hex()
    }
});