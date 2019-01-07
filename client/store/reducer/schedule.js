import {
    NEW_SCHEDULE_INIT,
    NEW_SCHEDULE_RESET,
    NEW_SCHEDULE_SET_TIME,
    NEW_SCHEDULE_SET_REPEAT,
    NEW_SCHEDULE_SET_TYPE,
    ADD_SCHEDULE,
    UPDATE_SCHEDULE,
    REMOVE_SCHEDULE,
    REMOVE_DEVICE_SCHEDULES,
    ENABLE_SCHEDULE,
    DISABLE_SCHEDULE,
} from '../constants';

// Template for schedules
let scheduleOne = {
    id: 1, // scheduleID
    deviceUUID: 1, // dispatch to which device
    from: 'manual', // integration type
    date: "21.12.2018", // Date on which to trigger
    time: "17:00", // Time on which to trigger
    repetitionPattern: 'week', // PatternType in which to repeat week | date
    repeat: ['mo', 'we', 'fr'], // Patterns on which to repeat
    isActive: false,
};

let scheduleTwo = {
    id: 2, // scheduleID
    deviceUUID: 1, // dispatch to which device
    from: 'manual', // integration type
    date: "22.12.2018", // Date on which to trigger
    time: "18:00", // Time on which to trigger
    repetitionPattern: 'week', // PatternType in which to repeat week | date
    repeat: ['mo', 'th', 'fr'], // Patterns on which to repeat
    isActive: false,
}


let scheduleThree = {
    id: 3, // scheduleID
    deviceUUID: 1, // dispatch to which device
    from: 'manual', // integration type
    date: "22.12.2018", // Date on which to trigger
    time: "18:00", // Time on which to trigger
    repetitionPattern: 'date', // PatternType in which to repeat week | date
    repeat: ['daily'], // Patterns on which to repeat
    isActive: false,
}

let initialState = {
    toAdd: {},
    active: [scheduleOne, scheduleTwo, scheduleThree]
}

const scheduleReducer = (state = initialState, action) => {
    let newState;

    // DB request in each level 
    switch(action.type) {
        case NEW_SCHEDULE_INIT: {
            // Saga Request db state
            newState = {...state, toAdd: {id: 1, deviceUUID: 2}}
            break;
        }
        case NEW_SCHEDULE_RESET: {
            newState = {...state, toAdd:{}}; // Reset current data in toAdd section
            break;
        }
        case NEW_SCHEDULE_SET_TIME: {
            newState = {...state, toAdd: {...toAdd, date: action.date, time: action.time}};
            break;
        }
        case NEW_SCHEDULE_SET_REPEAT: {
            newState = {...state, toAdd: {...toAdd, repetitionPattern: action.pattern, repeat: action.repeat}}
            break;
        }
        case NEW_SCHEDULE_SET_TYPE: {
            newState = {...state, toAdd: {...toAdd, from: action.type}};
            break;
        }
        case ADD_SCHEDULE: {
            // TODO: Update in DB, stack add call
            newState =  {current: state.current.push(action.payload), toAdd: {}};
            break;
        }
        case UPDATE_SCHEDULE: {
            // TODO: Update in DB, stack update call

            let schedule = action.payload;
            let update = (currentSchedule) => {
                if(currentSchedule.id == schedule.id && currentSchedule.deviceUUID == schedule.deviceUUID) {
                    return {...schedule};
                } else {
                    return currentSchedule;
                }
            }
            newState = state.current.map(update);
            break;
        }
        case REMOVE_SCHEDULE: {
            // TODO: Update in DB, stack remove call


            let schedule = action.payload;
            let removeOldSchedule = (currentSchedule) => {
                let equalDevices = (currentSchedule.deviceUUID == schedule.deviceUUID);
                let equalScheduleId = (currentSchedule.id == schedule.is);
                return equalDevices && equalScheduleId;
            };
            newState = state.current.filter(removeOldSchedule);
            break;
        }
        case REMOVE_DEVICE_SCHEDULES: {
            // TODO: Update in DB, stack remove call ( inside saga)

            let deviceUUID = action.payload;
            let schedulesWithoutDevice = (schedule) => schedule.deviceUUID == deviceUUID;
            newState = state.current.filter(schedulesWithoutDevice);
            break
        }
        case ENABLE_SCHEDULE: {
            // TODO: Update in DB, stack update call (Inside saga)

            let schedule = action.payload;
            let updateIsActive = (currentSchedule) => {
                if(currentSchedule.id == schedule.id && currentSchedule.deviceUUID == schedule.deviceUUID) {
                    return {...currentSchedule, isActive: true}
                } else {
                    return currentSchedule;
                }
            }
            newState = {...state, current: state.current.map(updateIsActive)};
            break;
        }
        case DISABLE_SCHEDULE: {
            
            let schedule = action.payload;
            let updateIsActive = (currentSchedule) => {
                if(currentSchedule.id == schedule.id && currentSchedule.deviceUUID == schedule.deviceUUID) {
                    return {...currentSchedule, isActive: false};
                } else {
                    return currentSchedule;
                }
            }
            newState = {...state, current: state.current.map(updateIsActive)}
            break;
        }

        default: newState = state;
    }

    return newState;
};
export default scheduleReducer;