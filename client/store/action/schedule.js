import {
    NEW_SCHEDULE_RESET,
    NEW_SCHEDULE_SET_TIME,
    NEW_SCHEDULE_SET_REPEAT,
    NEW_SCHEDULE_INIT,
    NEW_SCHEDULE_SET_TYPE,
    ADD_SCHEDULE,
    UPDATE_SCHEDULE,
    REMOVE_SCHEDULE,
    REMOVE_DEVICE_SCHEDULES,
    ENABLE_SCHEDULE,
    DISABLE_SCHEDULE
} from '../constants';

/**
 * Actions to create/reset new scheudle
 */
const newScheduleInit = () => {
    return {
        action: NEW_SCHEDULE_INIT
    }
}

const newScheduleReset = () => {
    return {
        action: NEW_SCHEDULE_RESET,
    }
};

const newScheduleSetTime = (time, date) => {
    return {
        action: NEW_SCHEDULE_SET_TIME,
        time: time,
        date: date
    }
};

const newScheduleSetRepeat = (pattern, repeat) => {
    return {
        action: NEW_SCHEDULE_SET_REPEAT,
        repetitionPattern: pattern,
        repeat: repeat
    }
};

const newScheduleSetType = type => {
    return {
        action: NEW_SCHEDULE_SET_TYPE,
        type: type
    }
}

const addSchedule = (schedule) => {
    return {
        action: ADD_SCHEDULE,
        payload: schedule
    }
};


/**
 * Actions on existing schedules 
 */
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

const enableSchedule = (schedule) => {
    return {
        type: ENABLE_SCHEDULE,
        payload: schedule
    }
};

const disableSchedule = (schedule) => {
    return {
        type: DISABLE_SCHEDULE,
        payload: schedule
    };
}


export {
    newScheduleInit,
    newScheduleReset,
    newScheduleSetTime,
    newScheduleSetRepeat,
    newScheduleSetType,
    addSchedule,
    removeSchedule,
    updateSchedule,
    removeDeviceSchedules,
    enableSchedule,
    disableSchedule
};