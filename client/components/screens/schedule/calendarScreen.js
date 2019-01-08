import React, {Component} from 'react';
import {View} from 'react-native';

import Header from '../../general/header';
import {TabNavigation, TabItem} from '../../navigation/tabs';
import AddManual from '../../schedule/add_manual';
import CircleButton from '../../general/button';

import {withFooter} from '../../general/screen_style';


export default class CalendarScreen extends React.Component {

    render() {
        return (
            <View style={withFooter.screenWrapper}>
                <Header>{"Add Schedule"}</Header>
                <TabNavigation>
                    <TabItem onPress={() => this.props.navigation.navigate('Manual')}>{"Manual"}</TabItem>
                    <TabItem onPress={() => this.props.navigation.navigate('Alarm')}>{"Alarm"}</TabItem>
                    <TabItem onPress={() => 1} isActive={true}>{"Calendar"}</TabItem>
                </TabNavigation>
                
            </View>
        )
    }
}