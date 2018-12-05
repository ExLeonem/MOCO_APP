import {ADD_DEVICE, REMOVE_DEVICE, RENAME_DEVICE} from '../constants';

const addDevice = (device) => {
    return {
        type: ADD_DEVICE,
        payload: device
    }
};

const removeDevice = (deviceId) => {
    return {
        type: REMOVE_DEVICE,
        deviceId: deviceId
    }
};

const renameDevice = (deviceData) => {
    return {
        type: RENAME_DEVICE,
        deviceData: deviceData
    }
};

export {
    addDevice,
    removeDevice,
    renameDevice
};