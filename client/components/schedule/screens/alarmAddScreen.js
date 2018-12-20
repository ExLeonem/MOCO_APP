import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';


export default class AlarmAddScreen extends React.Component {
    render() {
        return (
            <View>
                <Header>{"Add Schedule"}</Header>
                <TabNavigation>
                    <TabItem onPress={() => console.log("")}>{"Manuell"}</TabItem>
                    <TabItem onPress={() => console.log("")}>{"Alarm"}</TabItem>
                    <TabItem onPress={() => console.log("")}>{"Calendar"}</TabItem>
                </TabNavigation>
                
            </View>
        )
    }
}