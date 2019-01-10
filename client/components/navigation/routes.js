import FinishAddScreen from '../screens/schedule/finishAddScreen';
import {Easing, Animated} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import {GeneralOperationTabs} from './tabs';
import {ScheduleCreationTabs} from '../screens/schedule/navigation';



let scheduleStackNavigation = createStackNavigator({
        Main: GeneralOperationTabs,
        AddSchedule: ScheduleCreationTabs,
        Finish: {
            screen: FinishAddScreen
        }

    }, {
        initialRouteName: 'Main',
        headerMode: 'none',
        transitionConfig: () => ({
            transitionSpec: {
                duration: 0,
                timing: Animated.timing,
                easing: Easing.step0,
            }
        })
});


// Drawer navigation
let mainRoutes = {
    Devices: scheduleStackNavigation
}


export {
    mainRoutes
}