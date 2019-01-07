import {createDrawerNavigator, createAppContainer} from 'react-navigation';
import Drawer from '../general/drawer';
import {mainRoutes} from './routes';

const MainNavigation = createDrawerNavigator(mainRoutes,
{
    initialRouteName: "Devices",
    contentComponent: Drawer,
    drawerWidth: 300
});

const AppNavigator = createAppContainer(MainNavigation);

export {
    MainNavigation,
    AppNavigator
}