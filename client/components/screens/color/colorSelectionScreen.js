import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Header from '../../general/header';
import {TabNavigation, TabItem} from '../../navigation/tabs';
import {withFooter} from '../../general/screen_style';

import {ColorPicker, fromHsv} from 'react-native-color-picker';
import {connect} from 'react-redux';
import {setCurrentDeviceColor} from '../../../store/action/current_device';


class ColorSelectionScreen extends React.Component {

    render() {
        return (
            <View style={withFooter.screenWrapper}>
                <Header>Device Name</Header>
                <TabNavigation>
                    <TabItem onPress={() => this.props.navigation.navigate('Light')}>{"Light"}</TabItem>
                    <TabItem onPress={() => 1} isActive={true}>{"Color"}</TabItem>
                    <TabItem onPress={() => this.props.navigation.navigate('Schedule')}>{"Schedule"}</TabItem>
                </TabNavigation>
                <View style={styles.contentWrapper}>
                    <ColorPicker 
                        color={this.props.color}
                        hideSliders={true}
                        style={styles.picker}
                        onColorChange={hsvColor => this.props.setColor(fromHsv(hsvColor))}
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
        alignItems: 'center'
    },
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
        color: state.currentDevice.color
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setColor: color => dispatch(setCurrentDeviceColor(color))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ColorSelectionScreen);



