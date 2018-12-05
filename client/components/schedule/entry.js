import React, {Component} from 'react';
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Switch} from '@shoutem/ui';

/**
 */

class Entry extends Component {

    constructor(props) {
        super(props);
        const {dispatch} = props;
    }

    switchActive(value) {
        this.setState({active: value})
    }

    renderDateTime(time, date) {
        let toDisplay = date? <Text style={styles.clockDate}>, {date}</Text> : "";

        return (
            <Text style={styles.clockTime}>{time} Uhr{toDisplay}</Text>
        )
    }


    renderRepetitions(repeatEntryOn,repeatType = "date") {
        let repetitions;
        let entries = "";

        if(repeatType === "week") {
            repetitions = ["mo", "di", "mi", "do", "fr", "sa", "so"];
            let styleToAdd;
            for(rep in repetitions) {
                if(rep in repeatEntryOn) {
                    styleToAdd = styles.textRepetitionActive;
                } else {
                    styleToAdd = styles.textRepetitionInactive;
                }

                entries += <TouchableHighlight>
                    <Text style={styleToAdd}>{rep.charAt(0).toUpperCase() + rep.slice(1)}</Text>
                </TouchableHighlight>
            }

        } else if(repeatType === "date") {
            for(repeatOn in repeatEntryOn) {
                entries += <TouchableHighlight>
                    <Text> </Text>
                </TouchableHighlight>
            }
        }
        return entries;
    }

    render() {
        let renderedDateTime = this.renderDateTime(this.props.time, this.props.date);
        console.log("Render Time");
        return(
        <View style={styles.container}>
            <View style={styles.scheduleHeader}>
                {renderedDateTime}
                <Switch style={styles.scheduleSwitch} onValueChange={value => this.dispatch({active: value})} value={this.props.isActive}/>
            </View>
            <View>
            
            </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        height: 100,
        minHeight: 100,
        borderWidth: 2,
        borderColor: 'black'
    },
    scheduleHeader: {
        flex: 1,
        flexDirection: 'row'
    },
    scheduleSwitch: {
        alignSelf: 'flex-end'
    },
    clockTime: {
        fontSize: 20,
        color: '#424B54'
    },
    clockDate: {
        fontSize: 10,
        opacity: 0.6,
        color: '#424B54'
    },
    clockRepeat: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        height: 50,
        alignItems: 'center',
        borderBottomColor: '#424B54',
        borderBottomWidth: 2
    },
    textRepetitionActive: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    textRepetitionInactive: {
        paddingLeft: 10,
        paddingRight: 10,
        opacity: 0.6
    }
});


const mapStateToProps = (state, ownProps) => {
    return {...ownProps};
};

export default connect(mapStateToProps)(Entry);