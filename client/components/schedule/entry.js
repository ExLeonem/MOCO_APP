import React, {Component} from 'react';
import {View, Text, Switch, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {activateSchedule} from '../store/action/schedule';
import {defaultText} from '../colors';


const repStyles = StyleSheet.create({
    activeRepetition: {
        color: defaultText.lighten(0.8).hex(),
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

const RepetitionEntries = ({type, date, repetitions}) => {
    if(type == 'week') {
        let checkExistence = (entry) => {
                if(repetitions.includes(entry)) {
                    return {repeat: entry, isActive: true};
                } else {
                    return {repeat: entry, isActive: false};
                }
        }
        let defaultEntries = ["mo", "tu", "we", "th", "fr", "sa", "su"];
        let existent = defaultEntries.map(checkExistence);
        return (
            <View style={repStyles.repetitionBlock}>
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

const RepEntry = ({repeat, isActive}) => {
    let entryStyle = isActive? repStyles.activeRepetition : repStyles.inactiveRepetition;
    return (
        <Text style={entryStyle}>{capitalize(repeat)}</Text>
    );
}


class Entry extends Component {

    render() {
        let {time, date, repeat, type, isActive, toggleActive} = this.props;
    
        return(
        <TouchableWithoutFeedback>
            <View style={entryStyles.container}>
                <View style={entryStyles.scheduleHeader}>
                    <Text style={entryStyles.clockTime}>{time} Uhr</Text>
                    <Switch style={entryStyles.scheduleSwitch} onValueChange={toggleActive} value={isActive}/>
                </View>
                <RepetitionEntries repetitions={repeat} type={type} date={date}/>
            </View>
        </TouchableWithoutFeedback>
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
        alignItems: 'center',
    },
    scheduleSwitch: {
        flex: 1,
        alignSelf: 'center',
        marginRight: 30,
    },
    clockTime: {
        alignSelf: 'center',
        fontSize: 17,
        color: defaultText.hex(),
        marginLeft: 20
    }
});


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        toggleActive: (value) => dispatch(activateSchedule({deviceUUID: ownProps.uuid, id: ownProps.id}))

    }
}

export default connect(null, mapDispatchToProps)(Entry);