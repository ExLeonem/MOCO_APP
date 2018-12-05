import {combineReducers} from 'redux';

// Template for device element in devices list
const deviceTemplate = {
    uuid: 1,
    name: "Test licht",
    color: "#FFFFF",
    level: '0.8',
    active: false
};

// Template for schedules
let scheduleTemplate = {
    id: 1, // scheduleID
    deviceUUID: 1, // dispatch to which device
    from: 'manual', // integration type
    date: "21.12.2018", // Date on which to trigger
    time: "17:00", // Time on which to trigger
    repetitionPattern: 'week', // PatternType in which to repeat week | date
    repeat: ['mo', 'thu', 'fri'], // Patterns on which to repeat
    isActive: false,
};

// Load initial data from database
let initialState = {
    currentDevice: deviceTemplate,
    devices: [],
    schedules: [scheduleTemplate, scheduleTemplate],
};


const rootReducer = (state = initialState, action) => {
    return state;
}


export default rootReducer;