import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

import Header from '../../general/header';
import {TabNavigation, TabItem} from '../../navigation/tabs';
import Schedule from '../schedule';
import CircleButton from '../../general/button';

import {withFooter} from '../../general/screen_style';

import {connect} from 'react-redux';
import {newScheduleInit} from '../../../store/action/schedule';



class ScheduleScreen extends React.Component {
    
    createNewSchedule() {
        //
    
        this.props.navigation.navigate('AddSchedule');
    }

    render() {
        return (
            <View style={withFooter.screenWrapper}>
                <Header>Device Name</Header>
                <TabNavigation>
                    <TabItem onPress={() => console.log("")}>{"Light"}</TabItem>
                    <TabItem onPress={() => console.log("")}>{"Color"}</TabItem>
                    <TabItem onPress={() => console.log("")} isActive={true}>{"Schedule"}</TabItem>
                </TabNavigation>
                <Schedule style={withFooter.content}/>
                <View style={withFooter.footer}>
                    <CircleButton type={'add'} size={60} onPress={() => this.createNewSchedule()}/>
                </View>
            </View>
        );
    };
}


const mapDispatchToProps = dispatch => {
    return {
        initializeSchedule = () => dispatch(newScheduleInit())
    };
}


export default connect(null, mapDispatchToProps)(ScheduleScreen);





