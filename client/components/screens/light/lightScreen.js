import React, {Component} from 'react';
import {StyleSheet, View, TouchableHighlight, Slider, Text} from 'react-native';

import Header from '../../general/header';
import {TabNavigation, TabItem} from '../../navigation/tabs';
import {LampIcon} from '../../general/icons';
import {withFooter} from '../../general/screen_style';

import {snow} from '../../colors';

import {connect} from 'react-redux';
import {enableCurrentDevice, disableCurrentDevice, setCurrentDeviceLevel} from '../../../store/action/current_device';


let LightButton = ({isOn, onPress}) => {
    return (
        <TouchableHighlight onPress={onPress} underlayColor={snow.lighten(0.5).hex()}>
            <LampIcon isOn={isOn}/>
        </TouchableHighlight>
    )
}

class LightScreen extends React.Component {    
    render() {
        return (
            <View style={withFooter.screenWrapper}>
                <Header onPress={() => this.props.navigation.openDrawer()}>Device Name</Header>
                <TabNavigation>
                    <TabItem onPress={() => 1} isActive={true}>{"Light"}</TabItem>
                    <TabItem onPress={() => this.props.navigation.navigate('Color')}>{"Color"}</TabItem>
                    <TabItem onPress={() => this.props.navigation.navigate('Schedule')}>{"Schedule"}</TabItem>
                </TabNavigation>
                <View style={styles.contentWrapper}>
                    <LightButton 
                        isOn={this.props.isActive} 
                        onPress={() => this.props.isActive? this.props.disable() : this.props.enable()}
                    />
                </View>
                <View style={{...withFooter.footer, justifyContent: 'flex-start', position: 'relative'}}>
                    <Slider 
                        style={styles.levelSelection}
                        value={this.props.level} 
                        maximumValue={100}
                        minimumValue={0} 
                        step={1}
                        onValueChange={level => this.props.updateLevel(level)}
                    />
                </View>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    contentWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    levelSelection: {
        position: 'relative',
        width: 250,
        maxWidth: 400,
        minWidth: 150
    }
});


const mapStateToProps = (state) => {
    return {
        isActive: state.currentDevice.isActive,
        level: state.currentDevice.level
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        enable: () => dispatch(enableCurrentDevice()),
        disable: () => dispatch(disableCurrentDevice()),
        updateLevel: (level) => dispatch(setCurrentDeviceLevel(level))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LightScreen)


// Map state aquire state of current device
