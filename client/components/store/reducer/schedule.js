import {ADD_SCHEDULE, UPDATE_SCHEDULE, REMOVE_SCHEDULE, REMOVE_DEVICE_SCHEDULES} from '../constants';


const scheduleReducer = (state, action) => {

    let newState;

    // DB request in each level 
    switch(action.type) {
        case ADD_SCHEDULE: {
           newState =  {...state, schedules: state.schedules.push(action.payload)};
           break;
        }
        case UPDATE_SCHEDULE: {
            let schedule = action.payload;

            break;
        }
        case REMOVE_SCHEDULE: {
            let schedule = action.payload;
            let removeOldSchedule = (currentSchedule) => {
                let equalDevices = (currentSchedule.deviceUUID == schedule.deviceUUID);
                let equalScheduleId = (currentSchedule.id == schedule.is);
                return equalDevices && equalScheduleId;
            };
            newState = {...state, schedules: state.schedules.filter(removeOldSchedule)};
            break;
        }
        case REMOVE_DEVICE_SCHEDULES: {
            let deviceUUID = action.payload;
            let schedulesWithoutDevice = (schedule) => schedule.deviceUUID == deviceUUID;
            newState = {...state, schedules: state.schedules.filter(schedulesWithoutDevice)}
            break
        }
        default: newState = state;;
    }

    return newState;
};
export default scheduleReducer;