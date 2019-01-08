import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducer/index';


// Template for device element in devices list
const deviceTemplate = {
    uuid: 1,
    name: "Test licht",
    color: "#FFFF00",
    level: 10,
    isActive: false
};

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


let toAddTemp = {
    from: 'manual',
    date: new Date(),
    time: "17:00",
    repetitionPattern: null,
    repeat: [],
    isActive: true,
}

// Load initial data from database
let initialState = {
    schedules: {
        toAdd: {},
        current: [scheduleOne, scheduleTwo, scheduleThree]
    },
    devices: [],
    currentDevice: deviceTemplate
};


const store = createStore(rootReducer, initialState);
export default store;