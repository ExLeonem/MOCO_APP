import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import Header from '../../general/header';
import RepetitionItem from '../../schedule/repititionItem';
import CircleButton from '../../general/button';

import { snow, arsenic, blue, yellow } from '../../colors';
import { medium } from '../../fonts';
import {withFooter} from '../../general/screen_style';

import { connect } from 'react-redux';
import { newScheduleSetRepeat } from '../../../store/action/schedule';

const weekRepetition = ['monday', 'tuesday',  'wednsday', 'thursday', 'friday', 'saturday', 'sunday']
const {width}  = Dimensions.get('screen');
const elementsPerRow = 3;

const Row = ({children}) => {
    return (
        <View style={styles.rowStyle}>
            {children}
        </View>
    )
}
class RepetitionScreen extends React.Component {
    
    // Generate Button entries
    renderRepeatButtons(selected) {
        let elements = [];
        let rowElements = []
        let weekDay = "";
        let dayShort = "";
        let isSelected = false;
        for(let i = 0; i < weekRepetition.length; i++) {
            weekDay = weekRepetition[i];
            dayShort = weekDay.slice(0, 2);
            isSelected = selected.includes(dayShort);

            rowElements.push(<RepetitionItem selected={isSelected} dayName={weekDay} short={dayShort}/>)

            if((i+1) % elementsPerRow == 0) {
                elements.push(<Row>{rowElements}</Row>);
                rowElements = [];
            }
        }

        // Append last items
        if(rowElements.length != 0) {
            elements.push(<Row>{rowElements}</Row>);
        }

        return elements;
    }

    render() {
        return (
            <View style={withFooter.screenWrapper}>
                <Header
                    onPress={() => this.props.navigation.openDrawer()}
                    back={true}
                    onBack={() => this.props.navigation.goBack()}
                >
                    {"Add Schedule"}
                </Header>
                <View style={{...withFooter.content, ...styles.centerContent}}>
                    <Text style={styles.userPrompt}>Select days on which you would like to repeat the schedule.</Text>
                    <View style={styles.pillSelection}>
                        {this.renderRepeatButtons(this.props.repeat)}
                    </View>
                </View>
                <View style={withFooter.footer}>
                    <CircleButton
                        type="forward"
                        onPress={() => this.props.navigation.navigate("Finish")}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    pillSelection: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
        width: width,
    },
    userPrompt: {
        flex: 0,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        color: arsenic.lighten(0.6).hex(),
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: medium,
    },  
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    rowStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    }
});

const mapStateToProps = state => {
    let current = state.schedules.toAdd;
    return {
        repeat: current.repeat
    }
}

export default connect(mapStateToProps)(RepetitionScreen);