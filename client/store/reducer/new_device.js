import {INIT_NEW_DEVICE, SET_NEW_DEVICE_ADDRESS, SET_NEW_DEVICE_NAME, SET_NEW_DEVICE_MESSAGE} from '../constants';


const newDeviceReducer = (state = null, action) => {
    let newState = state;
    switch(action.type) {
        case INIT_NEW_DEVICE: {
            newState = {name: "", address: "", message: null};
            break;
        }
        case SET_NEW_DEVICE_NAME: {
            newState = {...state, name: action.name};
            break;
        }
        case SET_NEW_DEVICE_ADDRESS: {
            newState = {...state, address: action.address};
            break;
        }
        case SET_NEW_DEVICE_MESSAGE: {
            newState = {...state, message: action.message};
        }
    }

    return newState;
}

export default newDeviceReducer;