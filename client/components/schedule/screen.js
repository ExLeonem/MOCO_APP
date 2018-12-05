import React, {Components} from 'react';
import Entry from './entry';
import {StyleSheet, View, Text} from 'react-native';
import {connect} from 'react-redux';

class Schedule extends React.Component {

    renderEntries() {
        console.log("Generate entries");
        let entries = this.props.schedules.map((schedule) => {
        return <Entry 
                time={schedule.time}
                date={schedule.date} 
                type={schedule.repitionPattern} 
                repeat={schedule.repeat}
                isActive={schedule.isActive}
                uuid={schedule.deviceUUID}
            />;
        });
        return entries;
    };

    render() {
        return (
            <View style={styles.scheduleWrapper}>
                {this.renderEntries()}
            </View>
        );
    };
}


const styles = StyleSheet.create({
    scheduleWrapper: {

    }
});


const mapStateToProps = (state, ownProps) => {
    let filterSchedules = (scheduleEntry) => state.currentDevice.uuid == scheduleEntry.deviceUUID;
    let schedulesOfCurrentDevice = state.schedules.filter(filterSchedules);
    return {
        schedules: schedulesOfCurrentDevice
    }
};


export default connect(mapStateToProps)(Schedule);