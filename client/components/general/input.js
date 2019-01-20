
import React, {Component} from 'react';
import {StyleSheet, View, TextInput, Text, Animated} from 'react-native';
import {arsenic, snow} from '../colors';

export default class InputField extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isFocused: false,
        };
    }

    componentWillMount() {
        this._animatedIsFocused = new Animated.Value(this.props.value === '' || this.props.value == null ? 0:1);
    }

    componentDidUpdate() {
        Animated.timing(this._animatedIsFocused, {
            toValue: (this.state.isFocused || (this.props.value !== '' && this.props.value != null))? 1:0,
            duration: 200,
        }).start();
    }

    handleFocus = () => {
        this.setState({isFocused: true});
    }

    handleBlur = () => {
        if(!this.props.value || this.props.value === '' || this.props.value == null) {
            this.setState({isFocused: false});            
        }
    }
    
    createSubLabel = (subLabel) => {
        if(subLabel) {
            return (
                <Text style={styles.subLabel}>{subLabel}</Text>
            );
        }
    }

    render() {
        let setColor = this.props.invertColor != undefined? snow.hex() : arsenic.hex();

        const labelStyle = {
            position: "absolute",
            left: 35,
            top: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [18, 0]
            }),                
            fontSize: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [12, 10]
            }),
            color: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [setColor, setColor]
            }),
            opacity: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 0.6]
            })
        };


        let inputColor = this.props.invertColor? snow.darken(0.5).hex(): arsenic.hex();
        return (
            <View style={styles.container}>
                <Animated.Text style={labelStyle}>{this.props.label}</Animated.Text>
                {this.createSubLabel(this.props.subLabel)}
                <TextInput
                    value={this.props.value}
                    style={{...styles.inputBox, borderBottomColor: inputColor, color: setColor}}
                    placeholderTextColor={setColor}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    onChangeText={this.props.onChange}
                    editable={!this.props.disabled}
                    selectTextOnFocus={this.props.disabled}
                />
            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        position: 'relative',
        marginTop: 25
    },
    inputBox: {
        borderBottomWidth: 2,
        borderBottomColor: arsenic.hex(),
        marginLeft: 30,
        marginRight: 30
    },
    subLabel: {
        position: 'absolute',
        right: 45,
        top: 18,
        fontSize: 12,
        color: arsenic.lighten(0.6).hex()
    }
});