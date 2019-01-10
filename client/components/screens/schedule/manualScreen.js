import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

import Header from '../../general/header';
import {TabNavigation, TabItem} from '../../navigation/tabs';

import AddManual from '../../schedule/add_manual';
import CircleButton from '../../general/button';

import {withFooter} from '../../general/screen_style';


export default class ManualScreen extends React.Component {

    render() {
        return (
            <View style={withFooter.screenWrapper}>
                <Header>{"Add Schedule"}</Header>
                <TabNavigation>
                    <TabItem onPress={() => 1} isActive={true}>{"Manual"}</TabItem>
                    <TabItem onPress={() => this.props.navigation.navigate('Alarm')}>{"Alarm"}</TabItem>
                    <TabItem onPress={() => this.props.navigation.navigate('Calendar')}>{"Calendar"}</TabItem>
                </TabNavigation>
                <AddManual style={withFooter.content} onRepeat={() => this.props.navigation.navigate('Repeat')}/>
                <View style={withFooter.footer}>
                    <CircleButton type={"forward"} size={60} onPress={() => this.props.navigation.navigate('Finish')}/>
                </View>
            </View>
        );

    }
}