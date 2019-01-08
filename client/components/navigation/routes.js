import FinishAddScreen from '../screens/schedule/finishAddScreen';


import {createStackNavigator} from 'react-navigation';
import {GeneralOperationTabs, ScheduleCreationTabs} from './tabs';



let scheduleStackNavigation = createStackNavigator({
        Main: GeneralOperationTabs,
        AddSchedule: ScheduleCreationTabs,
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