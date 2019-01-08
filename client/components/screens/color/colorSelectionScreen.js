import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

import Header from '../../general/header';
import {TabNavigation, TabItem} from '../../navigation/tabs';

import {withFooter} from '../../general/screen_style';



export default class ColorSelectionScreen extends React.Component {

    render() {
        return (
            <View style={withFooter.screenWrapper}>
                <Header>Device Name</Header>
                <TabNavigation>
                    <TabItem onPress={() => this.props.navigation.navigate('Light')}>{"Light"}</TabItem>
                    <TabItem onPress={() => 1} isActive={true}>{"Color"}</TabItem>
                    <TabItem onPress={() => this.props.navigation.navigate('Schedule')}>{"Schedule"}</TabItem>
                </TabNavigation>
           
            </View>
        );
    };
}
