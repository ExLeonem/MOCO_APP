import ScheduleScreen from '../schedule/screens/mainScreen';
import AddScheduleScreen from '../schedule/screens/addScreen';
import FinishAddScreen from '../schedule/screens/finishAddScreen';

import {createStackNavigator} from 'react-navigation';


// Paths for Schedule creation
let scheduleStackNavigation = createStackNavigator({
        Main: {
            screen: ScheduleScreen
        },
        AddSchedule: {
            screen: AddScheduleScreen
        },
        Finish: {
            screen: FinishAddScreen
        }

    }, {
        initialRouteName: 'Main',
        headerMode: 'none'
});


// Drawer navigation
let mainRoutes = {
    Devices: scheduleStackNavigation
}


export {
    mainRoutes
}