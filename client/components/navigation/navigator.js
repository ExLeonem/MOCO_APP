import {createDrawerNavigator, createAppContainer} from 'react-navigation';
import DevicesDrawer from '../screens/device/navigation';
import {mainRoutes} from './routes';

import {Dimensions} from 'react-native';
const {width} = Dimensions.get('screen');


const MainNavigation = createDrawerNavigator(mainRoutes,
{
    initialRouteName: "Device",
    contentComponent: DevicesDrawer,
    drawerWidth: width
});

const AppNavigator = createAppContainer(MainNavigation);

export {
    MainNavigation,
    AppNavigator
}