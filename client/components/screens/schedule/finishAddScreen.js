import React, {Component} from 'react';
import {View} from 'react-native';

import Header from '../../general/header';
import {TabNavigation, TabItem} from '../../navigation/tabs';
import AddFinish from '../../schedule/add_finish';
import CircleButton from '../../general/button';

import {withFooter} from '../../general/screen_style';

/**
 * Screen to display before insertion
 */
export default class FinishAddScreen extends React.Component {

    render() {
        return (
            <View style={withFooter.screenWrapper}>
                <Header>{"Add Schedule"}</Header>

                <AddFinish style={withFooter.content}/>

                <View style={withFooter.footer}>
                    <CircleButton type={"check"} size={60} onPress={() => console.log("")}/>
                </View>
            </View>
        );
    }
}