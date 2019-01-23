import React, {Component} from 'react';
import {View, Text, Switch, TouchableWithoutFeedback, TouchableHighlight, StyleSheet} from 'react-native';
import {snow, blue, arsenic, white, red, defaultText} from '../colors';

import {connect} from 'react-redux';
import {enableSchedule, disableSchedule, addRemoveSchedule, popRemoveSchedule} from '../../store/action/schedule';



const repStyles = StyleSheet.create({
    activeRepetition: {
        color: defaultText.hex(),
    },
    inactiveRepetition: {
        color: defaultText.lighten(0.4).hex()
    },
    repetitionBlock: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: defaultText.lighten(0.6).hex(),
        marginLeft: 20,
        marginRight: 20
    },
    dateRepetitionBlock: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginRight: 20,
        marginLeft: 20,
        borderBottomWidth: 1,
        borderBottomColor: defaultText.lighten(0.6).hex()
    },
    dateRepetitionDate: {
        color: defaultText.lighten(0.8).hex(),
    }
});

const capitalize = (entry)  => {
    if(entry) {
        return entry.charAt(0).toUpperCase() + entry.slice(1);
    }
    return entry;
}

const RepetitionEntries = ({mode, type, date, repetitions}) => {
    if(type == 'week') {
        let checkExistence = (entry) => {
                if(repetitions.includes(entry)) {
                    return {mode: mode, repeat: entry, isActive: true};
                } else {
                    return {mode: mode, repeat: entry, isActive: false};
                }
        }
        let defaultEntries = ["mo", "tu", "we", "th", "fr", "sa", "su"];
        let existent = defaultEntries.map(checkExistence);
        return (
            <View style={mode? repStyles.repetitionBlock : {...repStyles.repetitionBlock, borderBottomColor: snow.hex()}}>
                {existent.map((props) => <RepEntry {...props}/>)}
            </View>
        )
    } else {
        let entry = repetitions.pop();
        return (
            <View style={repStyles.dateRepetitionBlock}>
                <Text style={repStyles.dateRepetitionDate}>{date}, <Text>{capitalize(entry)}</Text></Text>
            </View>
        )
    }
}

const RepEntry = ({mode, repeat, isActive}) => {
    let entryStyle = isActive? repStyles.activeRepetition : repStyles.inactiveRepetition;

    return (
        <Text style={mode ? entryStyle : {...entryStyle, color: snow.hex()}}>{capitalize(repeat)}</Text>
    );
}


class Entry extends Component {
    switchMode() {
        if(!this.props.delete) {
            this.props.removePush(this.props.id);
        } else {
            this.props.removePop(this.props.id);
        }
    }

    reverserSwitch() {
        if(this.props.delete) {
            this.props.removePop(this.props.id);
        } else if(this.props.deleteMode) {
            this.props.removePush(this.props.id);
        }
    }

    // Returns styles dependend on current state
    setContainerStyle = () => !this.props.delete ? entryStyles.container : {...entryStyles.container, backgroundColor: arsenic.hex()};
    setClockStyle = () => !this.props.delete ? entryStyles.clockTime : {...entryStyles.clockTime, color: snow.hex()}
    renderSwitch(isActive) {
        if(!this.props.delete) {
            return (
                <Switch  
                    onValueChange={isActive? this.props.disable : this.props.enable} 
                    value={isActive}
                />
            );
        }
        return null;
    }
    
    render() {
        let {time, date, repeat, type, isActive, toggleActive} = this.props;
    
        return(
        <TouchableHighlight 
            underlayColor={white.hex()}
            onPress={() => this.reverserSwitch()}
            onLongPress={() => this.switchMode()}
        >
            <View style={this.setContainerStyle()}>
                <View style={entryStyles.scheduleHeader}>
                    <Text style={this.setClockStyle()}>{time} Uhr</Text>
                    <View style={entryStyles.scheduleSwitch}>
                    {this.renderSwitch(isActive)}
                    </View>
                </View>
                <RepetitionEntries mode={!this.props.delete} repetitions={repeat} type={type} date={date}/>
            </View>
        </TouchableHighlight>
        );
    }
}

const entryStyles = StyleSheet.create({


    container: {
        flex: 1,
        position: 'relative',
        height: 100,
        minHeight: 100,
        paddingTop: 13,
        paddingBottom: 13,
        marginTop: 10
    },
    scheduleHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    scheduleSwitch: {
        flex: 1,
        paddingHorizontal: 30,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    clockTime: {
        alignSelf: 'center',
        fontSize: 17,
        color: defaultText.hex(),
        marginLeft: 20
    }
});

const mapStateToProps = state => {
    return {
        deleteMode: state.schedules.mode.delete
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        enable: () => dispatch(enableSchedule(ownProps.id)),
        disable: () => dispatch(disableSchedule(ownProps.id)),
        removePush: schedule =>  dispatch(addRemoveSchedule(schedule)),
        removePop: schedule => dispatch(popRemoveSchedule(schedule)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Entry);