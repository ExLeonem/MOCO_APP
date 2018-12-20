import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableHighlight, Modal, StyleSheet} from 'react-native';

import CircleButton from '../general/button';

import {snow, arsenic} from '../colors';
import {medium, subheader} from '../fonts';

import {connect} from 'react-redux';


const TimeUnit = ({children, key}) => {
    return (
        <TouchableHighlight key={children + "_" + key} style={  } onPress={() => console.log("")} underlayColor={snow.hex()}>
            <Text style={styles.unitText}>{children}</Text>
        </TouchableHighlight>
    );
}


/**
 * 
 */
export default class DateTimePicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hourSelected: 12,
            minuteSelected: 5
        }
    }

    renderTill(unit, key) {
        let timeUnits = []
        for(let i = 0; i < unit; i++) {
            timeUnits.push(<TimeUnit key={key}>{i}</TimeUnit>)
        }
        return timeUnits;
    }

    render() {
        return (
            <Modal 
                style={styles.modalWrapper} 
                nimationType='fade' 
                transparent={false} 
                visible={this.props.visible} 
                backdropColor={arsenic.hex()}
                onRequestClose={() => console.log("")}
            >
                <Text style={styles.selectionText}>{"Select activation time"}</Text>
                
                <View style={styles.timeSelectionDisplay}>
                    <ScrollView style={styles.hourDisplay}>
                        {this.renderTill(24, "hour")}
                    </ScrollView>

                    <ScrollView style={styles.minuteDisplay}>
                        {this.renderTill(60, "minute")}
                    </ScrollView>
                </View>

                {/* <CircleButton type={'check'} onPress={() => console.log("selected")}/> */}
            </Modal>
        )
    }
}


const styles = StyleSheet.create({
    modalWrapper: {
        borderWidth: 1,
        backgroundColor: 'yellow',
        margin: 15
    },  
    hourDisplay: {
        borderWidth: 1,
        width: 50,
    },
    minuteDisplay: {
        borderWidth: 1,
        width: 50
    },
    timeSelectionDisplay: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectionText: {
        textAlign: 'center'
    },
    unitText: {
        textAlign: 'center'
    }
})


const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {

    }
}

