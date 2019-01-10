import {Animated, Easing} from 'react-native'
import {createSwitchNavigator, createStackNavigator} from 'react-navigation';
import ManualScreen from './manualScreen';
import AlarmScreen from './alarmScreen';
import CalendarScreen from './calendarScreen';
import RepetitionScreen from './repetitionScreen';


const ManualStackNavigation = createStackNavigator({
    Manual: {screen: ManualScreen},
    Repeat: {screen: RepetitionScreen}
}, {
    initialRouteName: 'Manual',
    headerMode: 'none',
    transitionConfig: () => ({
        transitionSpec: {
            duration: 0,
            timing: Animated.timing,
            easing: Easing.step0,
        }
    })
});

const ScheduleCreationTabs = createSwitchNavigator({
    Manual: ManualStackNavigation,
    Alarm: {screen: AlarmScreen},
    Calendar: {screen: CalendarScreen}
}, {
    initialRouteName: 'Manual'
});


// let scheduleStackNavigation = createStackNavigator({
//     Main: GeneralOperationTabs,
//     AddSchedule: ScheduleCreationTabs,
//     Finish: {
//         screen: FinishAddScreen
//     }

// }, {
//     initialRouteName: 'Main',
//     headerMode: 'none',
//     transitionConfig: () => ({
//         transitionSpec: {
//             duration: 0,
//             timing: Animated.timing,
//             easing: Easing.step0,
//         }
//     })
// });


export {
    ScheduleCreationTabs,
}