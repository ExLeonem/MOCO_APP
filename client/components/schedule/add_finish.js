import React,{Component} from 'react';
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';
import TextSwitch from '../general/text_switch';
import {ColorPicker} from 'react-native-color-picker';

import {green, snow, arsenic} from '../colors';
import {header, medium, subheader, big} from '../fonts';


const TimeDateDisplay = ({time, date, onPress}) => {
    return (
        <View style={styles.timeDisplayContainer}>
            <TouchableHighlight style={styles.selectedTimeShow} onPress={onPress} underlayColor={snow.hex()}>
                <View>
                    <Text style={date != null? styles.timeAndDateFont: styles.onlyTimeFont}>{time}</Text>
                    {date != null? <Text style={{fontSize: subheader, color: arsenic.lighten(0.6).hex()}}>{date}</Text>: null}
                </View>
            </TouchableHighlight>
        </View>
    )
}

// const ColorSelector = ({}) => {
//     return (
        
//     )
// }


export default class AddFinish extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            mode: "sun",
            activation: "instant",
            color: "#ffff00"
        }
    }

    renderEaseSelection(currentMode) {
        if(currentMode !== "sun") {
            return <TextSwitch label={"Activation"} current={this.state.activation} left={"Instant"} right={"Ease"} onChange={value => this.setState({activation: value})}/>
        }
        return null;
    }

    renderColorSelection(currentMode) {
        if(currentMode !== "sun") {
            return (
                <ColorPicker
                    hideSliders={true}
                    onColorSelected={color => this.setState({color: color})}
                    defaultColor={this.state.color}
                    style={{flex: 1, height: 100, maxHeight: 100}}
                />
            )
        }
        return null;
    }

    render() {
        return (
            <View style={this.props.style}>
                <TimeDateDisplay time={"17:00"} date={"12.02.2018"} onPress={(value) => console.log("")}/>
                <TextSwitch label={"Mode"} current={this.state.mode} left={"Sun"} right={"Individual"} onChange={value => this.setState({mode: value})}/>
                {this.renderEaseSelection(this.state.mode)}
                {this.renderColorSelection(this.state.mode)}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    onlyTimeFont: {
        fontSize: big
    },
    timeAndDateFont: {
        fontSize: header,
    },
    timeDisplayContainer: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        height: 50,
        marginVertical: 10,
        marginHorizontal: 20,
    },
    selectedTimeShow: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        paddingLeft: 20,
        paddingHorizontal: 15,
        borderLeftColor: green.hex(),
        borderLeftWidth: 3.5
    }
});
