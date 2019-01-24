import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

import Header from '../../general/header';
import {TabNavigation, TabItem} from '../../navigation/tabs';
import Schedule from '../../schedule/schedule';
import CircleButton from '../../general/button';

import {withFooter} from '../../general/screen_style';

import {connect} from 'react-redux';
import {newScheduleInit, loadSchedules, removeSchedules} from '../../../store/action/schedule';



class ScheduleScreen extends React.Component {
    
    componentDidMount() {
        // Load schedules
        this.props.loadSchedules();
    }

    navCreateSchedule() {
        this.props.initializeSchedule();
        this.props.navigation.navigate('Manual');
    }


    render() {
        return (
            <View style={withFooter.screenWrapper}>
                <Header 
                    onPress={() => this.props.navigation.openDrawer()} 
                    delete={this.props.deleteActive}
                    onDelete={() => this.props.deleteSchedules()}
                >
                    {this.props.deviceName}
                </Header>
                <TabNavigation>
                    <TabItem onPress={() => this.props.navigation.navigate('Light')}>{"Light"}</TabItem>
                    <TabItem onPress={() => this.props.navigation.navigate('Color')}>{"Color"}</TabItem>
                    <TabItem onPress={() => 1} isActive={true}>{"Schedule"}</TabItem>
                </TabNavigation>
                <Schedule style={withFooter.content}/>
                <View style={withFooter.footer}>
                    <CircleButton type={'add'} size={60} onPress={() => this.navCreateSchedule()}/>
                </View>
            </View>
        );
    };
}

const mapStateToProps = state => {
    return {
        deviceName: state.currentDevice.name,
        deleteActive: state.schedules.mode.delete
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initializeSchedule: () => dispatch(newScheduleInit()),
        loadSchedules: () => dispatch(loadSchedules()),
        deleteSchedules: () => dispatch(removeSchedules())
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(ScheduleScreen);





