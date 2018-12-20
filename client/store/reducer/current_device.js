
import {UPDATE_CURRENT_DEVICE, RESET_CURRENT_DEVICE} from '../constants';

// Template for device element in devices list
const deviceTemplate = {
    uuid: 1,
    name: "Test licht",
    color: "#FFFFF",
    level: '0.8',
    active: false
};

const currentDeviceReducer = (state = deviceTemplate, action) => {
    let newState = state;
    switch(action.type) {
        case UPDATE_CURRENT_DEVICE: {
            newState = action.payload; // replace current device with new device
            break;
        }
        case RESET_CURRENT_DEVICE: {
            newState = {}
            break;
        }
    }

    return newState;
}


export default currentDeviceReducer;