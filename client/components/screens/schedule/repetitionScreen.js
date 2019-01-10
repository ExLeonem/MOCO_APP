import React, { Component } from 'react';
import { View, FlatList, TouchableHighlight, Text, StyleSheet} from 'react-native';
import Header from '../../general/header';

import { connect } from 'react-redux';
import { newScheduleSetRepeat } from '../../../store/action/schedule';
import { snow } from '../../colors';
import { medium } from '../../fonts';

const dateRepetition = ['daily', 'weekly', 'monthly', 'yearly']
const weekRepetition = ['monday', 'tuesday',  'wednsday', 'thursday', 'friday', 'saturday', 'sunday']
const RepetitionItem = ({value, selected}) => {
    return (
        <TouchableHighlight 
            style={selected.includes(value)? styles.selected : styles.unselected} 
            onPress={() => console.log("")} 
            underlayColor={snow.hex()}
        >
            <Text style={styles.listItem} >{value}</Text>
        </TouchableHighlight>
    )
}


class RepetitionScreen extends React.Component {
    render() {
        return (
            <View>
                <Header>Repeat</Header>
                <View>
                    {/* <FlatList 
                        data={this.props.pattern == 'date'? dateRepetition : weekRepetition}
                        renderItem={repeatValue => <RepetitionItem value={repeatValue} selected={this.props.repeat}/>}
                    /> */}
                </View>
            </View>
        )
    }
} 

const styles = StyleSheet.create({
    listItem: {
        fontSize: medium
    },
    selected: {

    },
    unselected: {

    }
})

const mapStateToProps = state => {
    let current = state.schedules.toAdd;
    return {
        pattern: current.repetitionPattern,
        repeat: current.repeat
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateRepeat: (repeat, repetitionPattern) => dispatch(newScheduleSetRepeat(repeat, repetitionPattern))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RepetitionScreen);