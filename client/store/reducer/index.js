import {combineReducers} from 'redux';
import scheduleReducer from './schedule';
import deviceReducer from './device';
import currentDeviceReducer from './current_device';
import drawerReducer from './drawer';
import newDeviceReducer from './new_device';


const rootReducer = combineReducers({
    schedules: scheduleReducer,
    devices: deviceReducer,
    currentDevice: currentDeviceReducer,
    drawer: drawerReducer,
    newDevice: newDeviceReducer
})


export default rootReducer;