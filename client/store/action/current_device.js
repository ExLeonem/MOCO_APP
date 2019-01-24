import {
    SET_CURRENT_DEVICE,
    SET_CURRENT_DEVICE_LEVEL,
    SET_CURRENT_DEVICE_COLOR,
    SET_CURRENT_DEVICE_URL,
    RENAME_CURRENT_DEVICE,
    ENABLE_CURRENT_DEVICE,
    DISABLE_CURRENT_DEVICE,
    RESET_CURRENT_DEVICE,
    UPDATE_CURRENT_DEVICE_ACTIVE,
    UPDATE_CURRENT_DEVICE,
    UPDATE_CURRENT_DEVICE_STORE
} from '../constants';


const updateCurrentDeviceStore = (color, level, isActive) => {
    return {
        type: UPDATE_CURRENT_DEVICE_STORE,
        color: color,
        level: level,
        isActive: isActive
    }
} 


const setCurrentDevice = (device) => {
    return {
        type: SET_CURRENT_DEVICE,
        device: device
    };
}

const setCurrentDeviceLevel = (level) => {
    return {
        type: SET_CURRENT_DEVICE_LEVEL,
        level: level
    }
}

const setCurrentDeviceColor = (color) => {
    return {
        type: SET_CURRENT_DEVICE_COLOR,
        color: color
    }
}

const setCurrentDeviceUrl = url => {
    return {
        type: SET_CURRENT_DEVICE_URL,
        url: url
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
        type: ENABLE_CURRENT_DEVICE,
        isActive: true
    }
}

const disableCurrentDevice = () => {
    return {
        type: DISABLE_CURRENT_DEVICE,
        isActive: false
    }
}

const resetCurrentDevice = (payload) => {
    return {
        type: RESET_CURRENT_DEVICE,
        payload: payload
    }
}

const updateCurrentDeviceActive = isActive => {
    return {
        type: UPDATE_CURRENT_DEVICE_ACTIVE,
        isActive: isActive
    }
}

const updateCurrentDevice = url => {
    return {
        type: UPDATE_CURRENT_DEVICE,
        url: url
    }
}


export {
    setCurrentDevice,
    setCurrentDeviceLevel,
    setCurrentDeviceColor,
    setCurrentDeviceUrl,
    renameCurrentDevice,
    enableCurrentDevice,
    disableCurrentDevice,
    resetCurrentDevice,
    updateCurrentDeviceActive,
    updateCurrentDevice,
    updateCurrentDeviceStore
}