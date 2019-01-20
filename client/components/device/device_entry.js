import React, {Component} from 'react';
import {View, TouchableHighlight, Text, StyleSheet} from 'react-native';


const ActiveButton = ({isActive=false}) => {
    return (
        <Touchable>
            
        </Touchable>
    )
}


export default class DeviceEntry extends React.Component {

    render() {
        return (
            <View>
                <View/>
                <View>
                    <TouchableHighlight> 
                        <Text>{this.props.name}</Text>
                    </TouchableHighlight>
                </View>
                
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        
    }
})