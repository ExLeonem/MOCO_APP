import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

import Header from '../../general/header';
import {TabNavigation, TabItem} from '../../navigation/tabs';
import Schedule from '../../schedule/schedule';
import CircleButton from '../../general/button';

import {withFooter} from '../../general/screen_style';

// import {connect} from 'react-redux';
// import {newScheduleInit} from '../../../store/action/schedule';



export default class ScheduleScreen extends React.Component {
    
    render() {
        return (
            <View style={withFooter.screenWrapper}>
                <Header>Device Name</Header>
                <TabNavigation>
                    <TabItem onPress={() => this.props.navigation.navigate('Light')}>{"Light"}</TabItem>
                    <TabItem onPress={() => this.props.navigation.navigate('Color')}>{"Color"}</TabItem>
                    <TabItem onPress={() => 1} isActive={true}>{"Schedule"}</TabItem>
                </TabNavigation>
                <Schedule style={withFooter.content}/>
                <View style={withFooter.footer}>
                    <CircleButton type={'add'} size={60} onPress={() => this.props.navigation.navigate('AddSchedule')}/>
                </View>
            </View>
        );
    };
}


// const mapDispatchToProps = dispatch => {
//     return {
//         initializeSchedule = () => dispatch(newScheduleInit())
//     };
// }


// export default connect(null, mapDispatchToProps)(ScheduleScreen);





