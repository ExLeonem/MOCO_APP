import {combineReducers} from 'redux';
import scheduleReducer from './schedule';
import deviceReducer from './device';
import currentDeviceReducer from './current_device';
import navigationReducer from './navigation';


const rootReducer = combineReducers({
    schedules: scheduleReducer,
    devices: deviceReducer,
    currentDevice: currentDeviceReducer,
    navigation: navigationReducer
})


export default rootReducer;