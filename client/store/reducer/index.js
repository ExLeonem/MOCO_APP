import {combineReducers} from 'redux';
import scheduleReducer from './schedule';
import deviceReducer from './device';
import currentDeviceReducer from './current_device';


const rootReducer = combineReducers({
    schedules: scheduleReducer,
    devices: deviceReducer,
    currentDevice: currentDeviceReducer
})


export default rootReducer;