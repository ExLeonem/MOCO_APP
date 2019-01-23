import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

import Header from '../../general/header';
import CircleButton from '../../general/button';
import {withFooter} from '../../general/screen_style';

import {NavigationActions} from 'react-navigation';
import {ColorPicker, fromHsv} from 'react-native-color-picker';
import connect from 'react-redux/lib/connect/connect';

import {newScheduleSetColor} from '../../../store/action/schedule';

/**
 * Screen to display before insertion
 */
class FinishAddScreen extends React.Component {

    insertAndResetNav() {
        const resetActions = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: "Schedule"})
            ]
        });
        this.props.navigation.dispatch(resetActions);
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

                <View style={{...withFooter.content, justifyContent: 'center', alignItems: 'center'}}>
                    <ColorPicker
                        hideSliders={true}
                        onColorChange={hsvColor => this.props.setColor(fromHsv(hsvColor))}
                        color={this.props.color}
                        style={styles.picker}
                    />
                </View>

                <View style={withFooter.footer}>
                    <CircleButton type={"check"} size={60} onPress={() => this.insertAndResetNav()}/>
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
        setColor: color => dispatch(newScheduleSetColor(color))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FinishAddScreen);