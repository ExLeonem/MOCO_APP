import {
    NEW_SCHEDULE_INIT,
    NEW_SCHEDULE_RESET,
    NEW_SCHEDULE_SET_TIME,
    NEW_SCHEDULE_SET_DATE,
    NEW_SCHEDULE_SET_TYPE,
    ADD_SCHEDULE,
    UPDATE_SCHEDULE,
    ADD_REMOVE_SCHEDULE,
    RESET_SCHEDULE_REMOVE,
    REMOVE_DEVICE_SCHEDULES,
    ENABLE_SCHEDULE,
    DISABLE_SCHEDULE,
    NEW_SCHEDULE_PUSH_REPEAT,
    NEW_SCHEDULE_REMOVE_REPEAT,
    NEW_SCHEDULE_SET_COLOR,
    SET_SCHEDULES,
    POP_REMOVE_SCHEDULE,
    REMOVE_STORE_SCHEDULES
} from '../constants';

import {blue, snow} from '../../components/colors';

let initialState = {
    toAdd: {},
    active: []
}

const scheduleReducer = (state = initialState, action) => {
    let newState;

    // DB request in each level 
    switch(action.type) {
        case NEW_SCHEDULE_INIT: {
            // Saga Request db state
            newState = {
                ...state,
                toAdd: {
                    from: 'manual',
                    isActive: true,
                    time: '01:00',
                    repeat: ["mo"],
                    pattern: 'week',
                    color: blue.hex(),
                    date: new Date()
                }
            }
            break;
        }
        case NEW_SCHEDULE_RESET: {
            newState = {...state, toAdd:{}}; // Reset current data in toAdd section
            break;
        }
        case NEW_SCHEDULE_SET_TIME: {
            newState = {...state, toAdd: {...state.toAdd, time: action.time}};
            break;
        }
        case NEW_SCHEDULE_SET_DATE: {
            newState = {...state, toAdd: {...state.toAdd, date: action.date}}
            break;
        }
        case NEW_SCHEDULE_SET_COLOR: {
            newState = {...state, toAdd: {...state.toAdd, color: action.color}};
            break;
        }
        case NEW_SCHEDULE_PUSH_REPEAT: {
            let newRepeat = [...state.toAdd.repeat, action.repeat];
            newState = {...state, toAdd: {...state.toAdd, repeat: newRepeat}};
            break;
        }
        case NEW_SCHEDULE_REMOVE_REPEAT: {
            let newRepeat = state.toAdd.repeat.filter( rep => {
                return rep != action.repeat;
            });
            newState = {...state, toAdd: {...state.toAdd, repeat: newRepeat}};
            break;
        }
        case NEW_SCHEDULE_SET_TYPE: {
            newState = {...state, toAdd: {...state.toAdd, from: action.scheduleType}};
            break;
        }
        case SET_SCHEDULES: {
            newState = {...state, current: action.schedules};
            break;  
        }
        // Delete Schedules
        case REMOVE_STORE_SCHEDULES: {
            let newSchedules = state.current.filter(schedule => {
                return !(state.mode.toDelete.includes(schedule.id));
            });
            console.log("Remove store schedules");
            newState = {...state, current: newSchedules, mode: {delete: false, toDelete: []}};
            break;
        }
        case ADD_REMOVE_SCHEDULE: {
            newState = {...state, mode: {
                ...state.mode,
                delete: (state.mode.toDelete.length == 0 ? true : state.mode.toDelete),
                toDelete: [...state.mode.toDelete, action.scheduleId]
            }};
            break;
        }
        case RESET_SCHEDULE_REMOVE: {
            newState = {...state, mode: {...state.mode, toDelete: []}};
            break;
        }
        case POP_REMOVE_SCHEDULE: {
            let newToRemove = state.mode.toDelete.filter(scheduleId => {
                return scheduleId !== action.scheduleId;
            });
            console.log("Left to delete: " + newToRemove.length);
            let deleteMode = newToRemove.length == 0 ? false : state.mode.delete;
            newState = {...state, mode: {delete: deleteMode, toDelete: newToRemove}};
            break;
        }
        // Add schedules
        case ADD_SCHEDULE: {
            // TODO: Update in DB, stack add call
            newState =  {...state, current: [...state.current, action.payload], toAdd: {}};
            break;
        }
        case UPDATE_SCHEDULE: {
            // TODO: Update routine
            let schedule = action.payload;
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

            let updateIsActive = schedule => {
                if(schedule.id == action.scheduleId) {
                    return {...schedule, isActive: true};
                } else {
                    return schedule;
                }
            }
            newState = {...state, current: state.current.map(updateIsActive)};
            break;
        }
        case DISABLE_SCHEDULE: {

            let updateIsActive = schedule => {
                if(schedule.id == action.scheduleId) {
                    return {...schedule, isActive: false};
                } else {
                    return schedule;
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