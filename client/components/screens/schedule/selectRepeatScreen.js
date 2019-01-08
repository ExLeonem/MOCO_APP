import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

import Header from '../../general/header';
import {TabNavigation, TabItem} from '../../navigation/tabs';
import Schedule from '../../schedule/schedule';
import CircleButton from '../../general/button';

import {withFooter} from '../../general/screen_style';

// import {connect} from 'react-redux';
// import {newScheduleInit} from '../../../store/action/schedule';



export default class SelectRepeatScreen extends React.Component {
    
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
            
            </View>
        );
    };
}
