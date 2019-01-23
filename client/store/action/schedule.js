import {
    NEW_SCHEDULE_INSERT,
    NEW_SCHEDULE_RESET,
    NEW_SCHEDULE_SET_TIME,
    NEW_SCHEDULE_SET_DATE,
    NEW_SCHEDULE_INIT,
    NEW_SCHEDULE_SET_TYPE,
    ADD_SCHEDULE,
    UPDATE_SCHEDULE,
    REMOVE_SCHEDULE,
    REMOVE_DEVICE_SCHEDULES,
    ENABLE_SCHEDULE,
    DISABLE_SCHEDULE,
    NEW_SCHEDULE_REMOVE_REPEAT,
    NEW_SCHEDULE_PUSH_REPEAT,
    NEW_SCHEDULE_SET_COLOR,
    LOAD_SCHEDULES,
    SET_SCHEDULES
    
} from '../constants';

/**
 * Actions to create/reset new scheudle
 */


const newScheduleInsert = () => {return {type: NEW_SCHEDULE_INSERT}}
const newScheduleInit = () => {return {type: NEW_SCHEDULE_INIT}}
const newScheduleReset = () => {return {type: NEW_SCHEDULE_RESET}}

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

const newScheduleSetColor = color => {
    return {
        type: NEW_SCHEDULE_SET_COLOR,
        color: color
    }
}

const newSchedulePushRepeat = repeat => {
    return {
        type: NEW_SCHEDULE_PUSH_REPEAT,
        repeat: repeat
    }
}

const newScheduleRemoveRepeat = repeat => {
    return {
        type: NEW_SCHEDULE_REMOVE_REPEAT,
        repeat: repeat
    }
}

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
const loadSchedules = () => {
    return {
        type: LOAD_SCHEDULES
    }
}

const setSchedules = (schedules) => {
    return {
        type: SET_SCHEDULES,
        schedules: schedules
    }
}

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
    newScheduleInsert,
    newScheduleInit,
    newScheduleReset,
    newScheduleSetTime,
    newScheduleSetDate,
    newScheduleSetColor,
    newSchedulePushRepeat,
    newScheduleRemoveRepeat,
    newScheduleSetType,
    loadSchedules,
    setSchedules,
    addSchedule,
    removeSchedule,
    updateSchedule,
    removeDeviceSchedules,
    enableSchedule,
    disableSchedule
};