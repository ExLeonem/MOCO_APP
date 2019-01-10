import {
    NEW_SCHEDULE_RESET,
    NEW_SCHEDULE_SET_TIME,
    NEW_SCHEDULE_SET_DATE,
    NEW_SCHEDULE_SET_REPEAT,
    NEW_SCHEDULE_INIT,
    NEW_SCHEDULE_SET_TYPE,
    ADD_SCHEDULE,
    UPDATE_SCHEDULE,
    REMOVE_SCHEDULE,
    REMOVE_DEVICE_SCHEDULES,
    ENABLE_SCHEDULE,
    DISABLE_SCHEDULE,
    
} from '../constants';

/**
 * Actions to create/reset new scheudle
 */
const newScheduleInit = () => {
    return {
        type: NEW_SCHEDULE_INIT
    }
}

const newScheduleReset = () => {
    return {
        type: NEW_SCHEDULE_RESET,
    }
};

const newScheduleSetTime = (time) => {
    return {
        type: NEW_SCHEDULE_SET_TIME,
        time: time,
    }
};

const newScheduleSetDate = date => {
    return {
        type: NEW_SCHEDULE_SET_DATE,
        date: date
    }
}

const newScheduleSetRepeat = (pattern, repeat) => {
    return {
        type: NEW_SCHEDULE_SET_REPEAT,
        repetitionPattern: pattern,
        repeat: repeat
    }
};

const newScheduleSetType = scheduleType => {
    return {
        type: NEW_SCHEDULE_SET_TYPE,
        scheduleType: scheduleType
    }
}

const addSchedule = (schedule) => {
    return {
        type: ADD_SCHEDULE,
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
    newScheduleSetDate,
    newScheduleSetRepeat,
    newScheduleSetType,
    addSchedule,
    removeSchedule,
    updateSchedule,
    removeDeviceSchedules,
    enableSchedule,
    disableSchedule
};