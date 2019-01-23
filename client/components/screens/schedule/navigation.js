import {createStackNavigator} from 'react-navigation';

import {Animated, Easing} from 'react-native';

import ScheduleScreen from './scheduleScreen';
import ManualScreen from './manualScreen';
import RepititionScreen from './repetitionScreen';
import FinishAddScreen from './finishAddScreen';


const ScheduleStackNav = createStackNavigator({
    Schedule: {screen: ScheduleScreen},
    Manual: {screen: ManualScreen},
    Repeat: {screen: RepititionScreen},
    Finish: {screen: FinishAddScreen}
}, {
    initialRouteName: 'Schedule',
    headerMode: 'none',
    transitionConfig: () => ({
        transitionSpec: {
            duration: 0,
            timing: Animated.timing,
            easing: Easing.step0,
        }
    })
});

export default ScheduleStackNav;