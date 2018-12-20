import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

import Header from '../../general/header';
import {TabNavigation, TabItem} from '../../navigation/tabs';

import AddManual from '../add_manual';
import CircleButton from '../../general/button';

import {withFooter} from '../../general/screen_style';
import {connect} from 'react-redux';



export default class AddScheduleScreen extends React.Component {

    render() {
        return (
            <View style={withFooter.screenWrapper}>
                <Header>{"Add Schedule"}</Header>
                <TabNavigation>
                    <TabItem onPress={() => console.log("")} isActive={true}>{"Manuell"}</TabItem>
                    <TabItem onPress={() => console.log("")}>{"Alarm"}</TabItem>
                    <TabItem onPress={() => console.log("")}>{"Calendar"}</TabItem>
                </TabNavigation>
                <AddManual style={withFooter.content}/>
                <View style={withFooter.footer}>
                    <CircleButton type={"forward"} size={60} onPress={() => console.log("")}/>
                </View>
            </View>
        );

    }
}