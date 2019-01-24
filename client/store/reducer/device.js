import {
    ADD_DEVICE, 
    REMOVE_DEVICE, 
    RENAME_DEVICE, 
    REPLACE_DEVICE_ADDRESS, 
    UPDATE_DEVICE_ACTIVE,
    INIT_DEVICES
} from '../constants';

const deviceTemplate = {
    uuid: 1,
    name: "Test licht",
    color: "#FFFFF",
    level: '0.8',
    active: false
};

const deviceReducer = (state = [deviceTemplate] , action) => {
    let newState = state;
    switch(action.type) {
        case INIT_DEVICES: {
            newState = action.devices;
            break;
        }
        case ADD_DEVICE: {
            newState = [...state, action.device];
            break;
        }
        case REMOVE_DEVICE: {
            let removeDevice = (device) => {
                if(device.url == action.url) {
                    return false;
                }
                return true;
            }
            newState = state.filter(removeDevice);
            break;
        }
        case RENAME_DEVICE: {
            let update = (device) => {
                if(device.url == action.address) {
                    return {...device, name: action.name};
                }
                return device;
            }
            newState = state.map(update);
            break;
        }
        case REPLACE_DEVICE_ADDRESS: {
            let update = (device) => {
                if(device.url == action.address) {
                    return {...device, url: action.url};
                }
                return device;
            }
            newState = state.map(update);
            break;
        }
        case UPDATE_DEVICE_ACTIVE: {
            newState = state.map(device => {
                console.log("Update device: ");
                if(device.url == action.url) {
                    return {...device, isActive: action.isActive};
                }
                return device;
            });
            break;
        }
    }   
    return newState;
}


export default deviceReducer;