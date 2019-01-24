import React, {Component} from 'react';
import {View} from 'react-native';

import Header from '../../general/header';
import AddManual from '../../schedule/add_manual';
import CircleButton from '../../general/button';

import {withFooter} from '../../general/screen_style';


export default class ManualScreen extends React.Component {
    render() {
        return (
            <View style={withFooter.screenWrapper}>
                <Header 
                    onPress={() => this.props.navigation.openDrawer()}
                    back={true}
                    onBack={() => this.props.navigation.goBack()}
                >{"Add Schedule"}</Header>
                <AddManual style={withFooter.content}/>
                <View style={withFooter.footer}>
                    <CircleButton type={"forward"} size={60} onPress={() => this.props.navigation.navigate('Repeat')}/>
                </View>
            </View>
        );

    }
}