import {
    NEW_SCHEDULE_INSERT,
    NEW_SCHEDULE_RESET,
    NEW_SCHEDULE_SET_TIME,
    NEW_SCHEDULE_SET_DATE,
    NEW_SCHEDULE_INIT,
    NEW_SCHEDULE_SET_TYPE,
    ADD_SCHEDULE,
    UPDATE_SCHEDULE,
    REMOVE_SCHEDULES,
    REMOVE_DEVICE_SCHEDULES,
    ENABLE_SCHEDULE,
    DISABLE_SCHEDULE,
    NEW_SCHEDULE_REMOVE_REPEAT,
    NEW_SCHEDULE_PUSH_REPEAT,
    NEW_SCHEDULE_SET_COLOR,
    LOAD_SCHEDULES,
    SET_SCHEDULES,
    RESET_SCHEDULE_REMOVE,
    ADD_REMOVE_SCHEDULE,
    POP_REMOVE_SCHEDULE,
    REMOVE_STORE_SCHEDULES
    
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


const removeStoreSchedules = () => {
    return {
        type: REMOVE_STORE_SCHEDULES
    }
}


const addRemoveSchedule = scheduleId => {
    return {
        type: ADD_REMOVE_SCHEDULE,
        scheduleId: scheduleId
    }
}

const popRemoveSchedule = scheduleId => {
    return {
        type: POP_REMOVE_SCHEDULE,
        scheduleId: scheduleId
    }
}

const removeSchedules = () => {
    return {
        type: REMOVE_SCHEDULES
    }
}

const resetRemoveSchedule = () => {
    return {
        type: RESET_SCHEDULE_REMOVE
    }
}


const removeDeviceSchedules = (deviceId) => {
    return {
        type: REMOVE_DEVICE_SCHEDULES,
        payload: deviceId
    }
}

const enableSchedule = (scheduleId) => {
    return {
        type: ENABLE_SCHEDULE,
        scheduleId: scheduleId
    }
}

const disableSchedule = (scheduleId) => {
    return {
        type: DISABLE_SCHEDULE,
        scheduleId: scheduleId
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
    removeStoreSchedules,
    addRemoveSchedule,
    popRemoveSchedule,
    removeSchedules,
    resetRemoveSchedule,
    updateSchedule,
    removeDeviceSchedules,
    enableSchedule,
    disableSchedule
};