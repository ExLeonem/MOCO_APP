import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

import {RepeatIcon, RemoveIcon} from '../general/icons';

import {arsenic, snow} from '../colors';
import {big, semiBig} from '../fonts';

import {connect} from 'react-redux';
import {newScheduleSetDate, newScheduleSetTime} from '../../store/action/schedule';


const TimeDisplay = ({hours, minutes, onPress}) => {
    return (
        <TouchableHighlight style={{padding: 10}} onPress={onPress} underlayColor={snow.hex()}>
            <Text style={styles.timeFont}>{hours + " : " + minutes}</Text>
        </TouchableHighlight>
    );
}


const DateDisplay = ({date, onPress, onPressRemove}) => {
    if(date != null) {
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
        return (
            <TouchableHighlight onPress={() => console.log("")} underlayColor={snow.hex()}>
                <Text>Add Date </Text>
            </TouchableHighlight>
        )
    }
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
});

class AddManual extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            timePickerVisible: false,
            datePickerVisible: false,
        }
    }

    __timeSelected = date => {
        let hours = parseInt(date.getHours()) < 10 ? "0" + date.getHours().toString : date.getHours();
        let minutes = parseInt(date.getMinutes()) < 10 ? "0" + date.getMinutes.toString : date.getMInutes();
        console.log(hours);
        
        this.props.updateTime(hours + ":" + minutes);
        this.__closeTimePicker();
    }

    __openTimePicker = () => this.setState({timePickerVisible: true})
    __closeTimePicker = () => this.setState({timePickerVisible: false})

    // Update values from 
    __dateSelected = date => {
        this.props.updateDate(date);
        this.__closeDatePicker();
    }

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
                    <RepetitionButton style={styles.repeatStyle} onPress={() => console.log("")}/>
                    <TimeDisplay hours={this.props.hours} minutes={this.props.minutes} onPress={() => this.__openTimePicker()}/>
                    <DateDisplay date={this.props.date} onPress={() => this.__openDatePicker()}  onPressRemove={() => console.log("")}/>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    let time = state.schedules.toAdd.time;
    let splittedTime = time.split(":");
    return {
        minutes: splittedTime[1],
        hours: splittedTime[0],
        date: state.schedules.toAdd.date,
    }
};


const mapDispatchToProps = dispatch => {
    return {
        updateTime: time => dispatch(newScheduleSetTime(time)),
        updateDate: date => dispatch(newScheduleSetDate(date))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddManual);