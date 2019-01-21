import React, {Component} from 'react';
import {View, Button, StyleSheet} from 'react-native';

import Header from '../../general/header';
import {TabNavigation, TabItem} from '../../navigation/tabs';

import AddManual from '../../schedule/add_manual';
import CircleButton from '../../general/button';

import {withFooter} from '../../general/screen_style';


export default class ManualScreen extends React.Component {

    render() {
        return (
            <View style={withFooter.screenWrapper}>
                <Header onPress={() => this.props.navigation.openDrawer()}>{"Add Schedule"}</Header>
                <AddManual style={withFooter.content} onRepeat={() => this.props.navigation.navigate('Repeat')}/>
                <View style={withFooter.footer}>
                    <CircleButton type={"forward"} size={60} onPress={() => this.props.navigation.navigate('Finish')}/>
                </View>
            </View>
        );

    }
}