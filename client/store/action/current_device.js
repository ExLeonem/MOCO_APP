import {UPDATE_CURRENT_DEVICE, RESET_CURRENT_DEVICE} from '../constants';

const updateCurrentDevice = (payload) => {
    return {
        type: UPDATE_CURRENT_DEVICE,
        payload: payload
    };
}

const resetCurrentDevice = (payload) => {
    return {
        type: RESET_CURRENT_DEVICE,
        payload: payload
    }
}



export {
    updateCurrentDevice,
    resetCurrentDevice
}