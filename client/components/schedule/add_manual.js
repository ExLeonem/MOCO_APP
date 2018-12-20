import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

import {RepeatIcon, RemoveIcon} from '../general/icons';

import {arsenic, snow} from '../colors';
import {big, semiBig} from '../fonts';


const TimeDisplay = ({hours, minutes, onPress}) => {
    return (
        <TouchableHighlight style={{padding: 10}} onPress={onPress} underlayColor={snow.hex()}>
            <Text style={styles.timeFont}>{hours + " : " + minutes}</Text>
        </TouchableHighlight>
    );
}

const DateDisplay = ({date, onPress, onPressRemove}) => {
    return (
        <View style={styles.dateDisplay}>
            <TouchableHighlight style={{padding:10, flex: 5}} onPress={onPress} underlayColor={snow.hex()}>
                <Text style={styles.dateFont}>{date.getDate() + "." + (date.getMonth()+1) + "." + date.getFullYear()}</Text>
            </TouchableHighlight>
            <TouchableHighlight style={{flex: 1, padding: 10, borderRadius: 50, justifyContent: 'center', alignItems: 'center'}} onPress={onPressRemove} underlayColor={snow.hex()}>
                <RemoveIcon color={arsenic.lighten(0.6).hex()} scaleBy={-5}/>
            </TouchableHighlight>
        </View>
    )
}

const RepetitionButton = ({onPress, style}) => {
    return (
        <View style={style}>
            <TouchableHighlight style={{padding: 10, borderRadius: 50}} onPress={onPress} underlayColor={snow.hex()}>
                <RepeatIcon color={arsenic.hex()}/>
            </TouchableHighlight>
        </View>
    )
}


export default class AddManual extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hours: "00",
            minutes: "00",
            date: new Date(),
            timePickerVisible: false,
            datePickerVisible: false
        }
    }

    __timeSelected = date => this.setState({hours: date.getHours() == "0"? "00":date.getHours(), minutes: date.getMinutes() == "0"? "00":date.getMinutes(), timePickerVisible: false});
    __openTimePicker = () => this.setState({timePickerVisible: true})
    __closeTimePicker = () => this.setState({timePickerVisible: false})

    __dateSelected = date => this.setState({date: date, datePickerVisible: false})
    __openDatePicker = () => this.setState({datePickerVisible: true})
    __closeDatePicker = () => this.setState({datePickerVisible: false})

    render() {
        return (
            <View style={this.props.style}>
                
                <DateTimePicker
                    isVisible={this.state.timePickerVisible}
                    onCancel={() => this.__closeTimePicker()}
                    onConfirm={date => this.__timeSelected(date)}
                    mode="time"
                />

                <DateTimePicker
                    isVisible={this.state.datePickerVisible}
                    onCancel={() => this.__closeDatePicker()}
                    onConfirm={date => this.__dateSelected(date)}
                    mode="date" 
                />
                

                <View style={styles.timePicker}>
                    <RepetitionButton style={styles.repeatStyle} onPress={() => console.log("Open repetition")}/>
                    <TimeDisplay hours={this.state.hours} minutes={this.state.minutes} onPress={() => this.__openTimePicker()}/>
                    <DateDisplay date={this.state.date} onPress={() => this.__openDatePicker()}  onPressRemove={() => console.log("")}/>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    timePicker: {
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    timeFont: {
        fontSize: big
    },
    dateFont: {
        fontSize: semiBig,
        textAlign: 'center'
    },
    repeatStyle: {
        position: 'absolute',
        top: 20,
        right: 40
    },
    dateDisplay: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'relative',
        width: 150,
        marginTop: 5
    }
})