import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import Entry from './entry';
import {connect} from 'react-redux';

/**
 * Define prop to use own filter function for schedules?
 */

class Schedule extends Component {

    renderEntries(schedules) {
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
            />;
        });
        return entries;
    };

    render() {
        return (
            <ScrollView style={this.props.style}>
                {this.renderEntries(this.props.schedules)}
            </ScrollView>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    // Show only schedules for current device
    let filterSchedules = (scheduleEntry) => state.currentDevice.uuid == scheduleEntry.deviceUUID;
    let schedulesOfCurrentDevice = state.schedules.active.filter(filterSchedules);
    return {
        schedules: schedulesOfCurrentDevice
    }
};


export default connect(mapStateToProps)(Schedule);