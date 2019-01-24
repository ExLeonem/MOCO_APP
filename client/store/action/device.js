import {
    SELECT_CURRENT_DEVICE, 
    ADD_DEVICE, REMOVE_DEVICE, 
    RENAME_DEVICE, 
    REPLACE_DEVICE_ADDRESS, 
    DISABLE_DEVICE, 
    ENABLE_DEVICE, 
    UPDATE_DEVICE_ACTIVE,
    LOAD_DEVICES,
    INIT_DEVICES
} from '../constants';

const initDevices = devices => {
    return {
        type: INIT_DEVICES,
        devices: devices
    }
}

const loadDevices = () => {
    return {
        type: LOAD_DEVICES
    }
}

const selectCurrentDevice = (url) => {
    return {
        type: SELECT_CURRENT_DEVICE,
        url: url
    }
}

const addDevice = (device) => {
    return {
        type: ADD_DEVICE,
        device: device
    }
};

const removeDevice = (url) => {
    return {
        type: REMOVE_DEVICE,
        url: url
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

const enableDevice = (url) => {
    return {
        type: ENABLE_DEVICE,
        url: url
    }
}

const disableDevice = (url) => {
    return {
        type: DISABLE_DEVICE,
        url: url
    }
}

const updateDeviceActive = (url, isActive) => {
    return {
        type: UPDATE_DEVICE_ACTIVE,
        url: url,
        isActive: isActive
    }
}

export {
    initDevices,
    loadDevices,
    selectCurrentDevice,
    addDevice,
    removeDevice,
    renameDevice,
    replaceDeviceAddress,
    enableDevice,
    disableDevice,
    updateDeviceActive
};