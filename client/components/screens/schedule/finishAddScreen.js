import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Header from '../../general/header';
import CircleButton from '../../general/button';
import {withFooter} from '../../general/screen_style';
import {arsenic} from '../../colors';

import {StackActions, NavigationActions} from 'react-navigation';
import {ColorPicker, fromHsv} from 'react-native-color-picker';
import connect from 'react-redux/lib/connect/connect';

import {newScheduleSetColor, newScheduleInsert} from '../../../store/action/schedule';

/**
 * Screen to display before insertion
 */
class FinishAddScreen extends React.Component {

    resetNav() {
        const resetActions = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: "Schedule"})
            ]
        });
        this.props.navigation.dispatch(resetActions);
    }

    insertSchedule() {
        this.props.insertSchedule();
        this.resetNav();
    }

    render() {
        return (
            <View style={withFooter.screenWrapper}>
                <Header 
                    onPress={() => this.props.navigation.openDrawer()}
                    back={true}
                    onBack={() => this.resetNav()}
                >
                    {"Add Schedule"}
                </Header>

                <View style={{...withFooter.content, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: arsenic.lighten(0.6).hex()}}>Finally select a color.</Text>
                    <ColorPicker
                        onColorChange={hsvColor => this.props.setColor(fromHsv(hsvColor))}
                        color={this.props.color}
                        style={styles.picker}
                    />
                </View>

                <View style={withFooter.footer}>
                    <CircleButton type={"check"} size={60} onPress={() => this.insertSchedule()}/>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    picker: {
        width: 250,
        height: 250,
        maxWidth: 300,
        maxHeight: 300,
        minWidth: 100,
        minHeight: 100,
    }
});

const mapStateToProps = state => {
    return {
        color: state.schedules.toAdd.color
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setColor: color => dispatch(newScheduleSetColor(color)),
        insertSchedule: () => dispatch(newScheduleInsert())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FinishAddScreen);