import {ADD_SCHEDULE, UPDATE_SCHEDULE, REMOVE_SCHEDULE, REMOVE_DEVICE_SCHEDULES} from '../constants';


const addSchedule = (schedule) => {
    return {
        action: ADD_SCHEDULE,
        payload: schedule
    }
};

const updateSchedule = (schedule) => {
    return {
        type: UPDATE_SCHEDULE,
        payload: schedule
    }
};

const removeSchedule = (scheduleId) => {
    return {
        type: REMOVE_SCHEDULE,
        payload: scheduleId
    }
};

const removeDeviceSchedules = (deviceId) => {
    return {
        type: REMOVE_DEVICE_SCHEDULES,
        payload: deviceId
    }
};

const activateSchedule = (schedule) => {
    return {
        type: ACTIVATE_SCHEDULE,
        payload: schedule
    }
};


export {
    addSchedule,
    removeSchedule,
    updateSchedule,
    removeDeviceSchedules,
    activateSchedule
};