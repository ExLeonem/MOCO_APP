import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import Entry from './entry';
import {connect} from 'react-redux';

/**
 * Define prop to use own filter function for schedules?
 */

class Schedule extends Component {

    renderEntries(schedules, toDelete) {
        let entries = schedules.map((schedule) => {
            console.log("Render entry");
        return <Entry 
                key={parseInt(schedule.id) + parseInt(schedule.uuid)}
                time={schedule.time}
                date={schedule.date} 
                type={schedule.repetitionPattern} 
                repeat={schedule.repeat}
                isActive={schedule.isActive}
                uuid={schedule.deviceUUID}
                id={schedule.id}
                delete={toDelete.includes(schedule.id)}
            />;
        });
        return entries;
    };

    render() {
        return (
            <ScrollView style={this.props.style}>
                {this.renderEntries(this.props.schedules, this.props.toDelete)}
            </ScrollView>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    // Show only schedules for current device
    let filterSchedules = (scheduleEntry) => state.currentDevice.url == scheduleEntry.url;
    let schedulesOfCurrentDevice = state.schedules.current.filter(filterSchedules);
    return {
        schedules: schedulesOfCurrentDevice,
        toDelete: state.schedules.mode.toDelete
    }
};


export default connect(mapStateToProps)(Schedule);