import {ADD_DEVICE, REMOVE_DEVICE, RENAME_DEVICE} from '../constants';

const addDevice = (payload) => {
    return {
        type: ADD_DEVICE,
        payload: payload
    }
};

const removeDevice = (payload) => {
    return {
        type: REMOVE_DEVICE,
        payload: payload
    }
};

const renameDevice = (payload) => {
    return {
        type: RENAME_DEVICE,
        payload: payload
    }
};

export {
    addDevice,
    removeDevice,
    renameDevice
};