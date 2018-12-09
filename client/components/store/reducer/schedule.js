import {ADD_SCHEDULE, UPDATE_SCHEDULE, REMOVE_SCHEDULE, REMOVE_DEVICE_SCHEDULES, ACTIVATE_SCHEDULE} from '../constants';


const scheduleReducer = (state = [], action) => {
    let newState;

    // DB request in each level 
    switch(action.type) {
        case ADD_SCHEDULE: {
            // TODO: Update in DB, stack add call

            // newState =  {...state, schedules: state.schedules.push(action.payload)};
            newState = state.push(action.payload);
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
            newState = state.map(update);
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
            newState = state.filter(removeOldSchedule);
            break;
        }
        case REMOVE_DEVICE_SCHEDULES: {
            // TODO: Update in DB, stack remove call

            let deviceUUID = action.payload;
            let schedulesWithoutDevice = (schedule) => schedule.deviceUUID == deviceUUID;
            newState = state.filter(schedulesWithoutDevice);
            break
        }
        case ACTIVATE_SCHEDULE: {
            // TODO: Update in DB, stack update call

            let schedule = action.payload;
            let updateIsActive = (currentSchedule) => {
                if(currentSchedule.id == schedule.id && currentSchedule.deviceUUID == schedule.deviceUUID) {
                    return {...currentSchedule, isActive: !currentSchedule.isActive}
                } else {
                    return currentSchedule;
                }
            }
            newState = state.map(updateIsActive);
            break;
        }
        default: newState = state;;
    }

    return newState;
};
export default scheduleReducer;