import {createDrawerNavigator, createAppContainer} from 'react-navigation';
import Drawer from '../general/drawer';
import {mainRoutes} from './routes';

import {Dimensions} from 'react-native';
const {width} = Dimensions.get('screen');


const MainNavigation = createDrawerNavigator(mainRoutes,
{
    initialRouteName: "Devices",
    contentComponent: Drawer,
    drawerWidth: width
});

const AppNavigator = createAppContainer(MainNavigation);

export {
    MainNavigation,
    AppNavigator
}