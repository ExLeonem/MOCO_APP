
import React, {Component} from 'react';
import {StyleSheet, View, TextInput, Text, Animated} from 'react-native';
import {black} from '../general/colors';

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
                outputRange: [black.hex(), black.hex()]
            }),
            opacity: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 0.6]
            })
        };

        return (
            <View style={styles.container}>
                <Animated.Text style={labelStyle}>{this.props.label}</Animated.Text>
                {this.createSubLabel(this.props.subLabel)}
                <TextInput
                    value={this.props.value}
                    style={styles.inputBox}
                    placeholderTextColor={black.hex()}
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
        borderBottomColor: black.hex(),
        marginLeft: 30,
        marginRight: 30
    },
    subLabel: {
        position: 'absolute',
        right: 45,
        top: 18,
        fontSize: 12,
        color: black.lighten(0.6).hex()
    }
});