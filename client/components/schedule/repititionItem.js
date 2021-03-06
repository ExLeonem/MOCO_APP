import React from 'react';
import {Text, TouchableHighlight, StyleSheet, Dimensions} from 'react-native';

import {snow, arsenic, blue} from '../colors';

import {connect} from 'react-redux';
import {newSchedulePushRepeat, newScheduleRemoveRepeat} from '../../store/action/schedule';


const {width} = Dimensions.get('screen');

class RepetitionItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: this.props.selected
        }
    }

    switchSelected(short) {
        if(this.props.selected) {
            this.props.remove(short);
        } else {
            this.props.add(short);
        }
    }

    render() {
        return (
            <TouchableHighlight
                style={this.props.selected? repItemStyle.selected : repItemStyle.notSelected} 
                onPress={() => this.switchSelected(this.props.short)} 
                underlayColor={this.props.selected? blue.hex() : snow.hex()}
            >
                <Text style={this.props.selected? {color: snow.hex()} : {color: blue.hex()}}>{this.props.dayName}</Text>
            </TouchableHighlight>
        )
    }
}

const general = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    width: (width * 0.25),
    borderRadius: (width * 0.1)
};

const repItemStyle = StyleSheet.create({
    selected: {
        ...general,
        backgroundColor: blue.hex(),
        borderWidth: 1,
        borderColor: snow.hex()
    },
    notSelected: {
        ...general,
        borderColor: blue.hex(),
        borderWidth: 1,
    }
});

const mapDispatchToProps = dispatch => {
    return {
        add: short => dispatch(newSchedulePushRepeat(short)),
        remove: short =>  dispatch(newScheduleRemoveRepeat(short))
    }
}


export default connect(null, mapDispatchToProps)(RepetitionItem);