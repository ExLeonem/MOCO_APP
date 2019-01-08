import React, {Component} from 'react';
import {View} from 'react-native';

import Header from '../../general/header';
import {TabNavigation, TabItem} from '../../navigation/tabs';
import AddManual from '../../schedule/add_manual';
import CircleButton from '../../general/button';

import {withFooter} from '../../general/screen_style';


export default class AlarmScreen extends React.Component {

    render() {
        return (
            <View style={withFooter.screenWrapper}>
                <Header>{"Add Schedule"}</Header>
                <TabNavigation>
                    <TabItem onPress={() => this.props.navigation.navigate('Manual')}>{"Manual"}</TabItem>
                    <TabItem onPress={() => 1} isActive={true}>{"Alarm"}</TabItem>
                    <TabItem onPress={() => this.props.navigation.navigate('Calendar')}>{"Calendar"}</TabItem>
                </TabNavigation>

            </View>
        )
    }
}