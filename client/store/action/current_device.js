import {
    SET_CURRENT_DEVICE,
    SET_CURRENT_DEVICE_LEVEL,
    SET_CURRENT_DEVICE_COLOR,
    RENAME_CURRENT_DEVICE,
    ENABLE_CURRENT_DEVICE,
    DISABLE_CURRENT_DEVICE,
    RESET_CURRENT_DEVICE,
} from '../constants';


const setCurrentDevice = (payload) => {
    return {
        type: SET_CURRENT_DEVICE,
        device: device
    };
}

const setCurrentDeviceLevel = (level) => {
    return {
        type: UPDATE_CURRENT_DEVICE_OPACITY,
        level: level
    }
}

const setCurrentDeviceColor = (color) => {
    return {
        type: SET_CURRENT_DEVICE_COLOR,
        color: color
    }
}

const renameCurrentDevice = (name) => {
    return {
        type: RENAME_CURRENT_DEVICE,
        name: name
    }
}

const enableCurrentDevice = () => {
    return {
        type: ENABLE_CURRENT_DEVICE
    }
}

const disableCurrentDevice = () => {
    return {
        type: DISABLE_CURRENT_DEVICE
    }
}

const resetCurrentDevice = (payload) => {
    return {
        type: RESET_CURRENT_DEVICE,
        payload: payload
    }
}



export {
    setCurrentDevice,
    setCurrentDeviceLevel,
    setCurrentDeviceColor,
    renameCurrentDevice,
    enableCurrentDevice,
    disableCurrentDevice,
    resetCurrentDevice
}