import {Easing, Animated} from 'react-native';


import MainScreen from './mainScreen';
import AddMainScreen from './addMainScreen';

import {createStackNavigator, createSwitchNavigator} from 'react-navigation';

const InitStackNav = createStackNavigator({
    Select: {screen: MainScreen},
    Create: {screen: AddMainScreen}
}, {
    initialRouteName: 'Select',
    headerMode: 'none',
    transitionConfig: () => ({
        transitionSpec: {
            duration: 0,
            timing: Animated.timing,
            easing: Easing.step0,
        }
    })
});

export default InitStackNav;