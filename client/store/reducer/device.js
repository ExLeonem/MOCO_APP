import {ADD_DEVICE, REMOVE_DEVICE, RENAME_DEVICE, REPLACE_DEVICE_ADDRESS, DISABLE_DEVICE, ENABLE_DEVICE} from '../constants';
import SQlite from 'react-native-sqlite-storage';


const deviceTemplate = {
    uuid: 1,
    name: "Test licht",
    color: "#FFFFF",
    level: '0.8',
    active: false
};

const updateDevice = (name) => {
    return (device) => {
        if(device.name == action.payload.uuid) {
            return {...device, name: action.payload.name};
        }
    }
}

const deviceReducer = (state = [deviceTemplate] , action) => {
    let newState = state;
    switch(action.type) {
        case ADD_DEVICE: {
            newState = state.push(action.payload);
            break;
        }
        case REMOVE_DEVICE: {
            let removeDevice = (device) => {
                if(device.uuid == action.payload.uuid) {
                    return false;
                }
                return true;
            }
            newState = state.filter(removeDevice)
            break;
        }
        case RENAME_DEVICE: {
            let update = (device) => {
                if(device.uuid == action.payload.uuid) {
                    return {...device, name: action.payload.name};
                }
                return device;
            }
            newState = state.map(update);
            break;
        }
        case REPLACE_DEVICE_ADDRESS: {
            let update = (device) => {
                if(device.uuid == action.payload.uuid) {
                    return {...device, url: action.payload.address};
                }
                return device;
            }
            newState = state.map(update);
            break;
        }
        case ENABLE_DEVICE: {
            let update = device => {
                if(device.uuid == action.payload.uuid) {
                    return {...device, isActive: true};
                }
                return device;
            }
            newState = state.map(update);
            break;
        }
        case DISABLE_DEVICE: {
            let update = device => {
                if(device.uuid == action.payload.uuid) {
                    return {...device, isActive: false};
                }
                return device;
            }
            newState = state.map(update);
            break;
        }
    }   
    return newState;
}


export default deviceReducer;