
import {
    SET_CURRENT_DEVICE,
    SET_CURRENT_DEVICE_LEVEL,
    SET_CURRENT_DEVICE_COLOR,
    RENAME_CURRENT_DEVICE,
    ENABLE_CURRENT_DEVICE,
    DISABLE_CURRENT_DEVICE,
    RESET_CURRENT_DEVICE,
} from '../constants';

// Template for device element in devices list
const deviceTemplate = {
    uuid: 1,
    name: "Test licht",
    color: "#FFFFF",
    level: 10,
    isActive: false
};

const currentDeviceReducer = (state = deviceTemplate, action) => {
    let newState = state;
    switch(action.type) {
        case SET_CURRENT_DEVICE: {
            // REQUEST first?
            newState = {...action.device}; // replace current device with new device
            break;
        }
        case SET_CURRENT_DEVICE_LEVEL: {
            newState = {...state, level: action.level};
           break; 
        }
        case SET_CURRENT_DEVICE_COLOR: {
            newState = {...state, color: action.color};
            break;
        }
        case RENAME_CURRENT_DEVICE: {
            newState = {...state, name: action.name};
            break;
        }
        case ENABLE_CURRENT_DEVICE: {
            newState = {...state, isActive: true};
            break;
        }
        case DISABLE_CURRENT_DEVICE: {
            newState = {...state, isActive: false};
            break;
        }
        case RESET_CURRENT_DEVICE: {
            newState = {};
            break;
        }
    }

    return newState;
}


export default currentDeviceReducer;