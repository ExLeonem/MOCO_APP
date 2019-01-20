import {ADD_DEVICE, REMOVE_DEVICE, RENAME_DEVICE, REPLACE_DEVICE_ADDRESS, DISABLE_DEVICE, ENABLE_DEVICE} from '../constants';

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

const replaceDeviceAddress = (payload) => {
    return {
        type: REPLACE_DEVICE_ADDRESS,
        payload: payload
    }
};

const enableDevice = (payload) => {
    return {
        type: ENABLE_DEVICE,
        payload: payload
    }
}

const disableDevice = (payload) => {
    return {
        type: DISABLE_DEVICE,
        payload: payload
    }
}

export {
    addDevice,
    removeDevice,
    renameDevice,
    replaceDeviceAddress,
    enableDevice,
    disableDevice
};