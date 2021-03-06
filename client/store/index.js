import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducer/index';
import rootSaga from './saga/index';


// Template for device element in devices list
// const deviceTemplate = {
//     uuid: 1,
//     url: "https://www.qqwa.de/sneaky/moco",
//     name: "Test licht",
//     color: "#FFFF00",
//     level: 10,
//     isActive: false
// };

// Template for schedules
let scheduleOne = {
    id: 1, // scheduleID
    url: "https://www.qqwa.de/sneaky/moco", // dispatch to which device
    from: 'manual', // integration type
    date: "21.12.2018", // Date on which to trigger
    time: "17:00", // Time on which to trigger
    repetitionPattern: 'week', // PatternType in which to repeat week | date
    repeat: ['mo', 'we', 'fr'], // Patterns on which to repeat
    isActive: false,
};



let toAddTemp = {
    from: 'manual',
    date: new Date(),
    time: "17:00",
    pattern: null,
    repeat: [],
    isActive: true,
}

// Load initial data from database
let initialState = {
    schedules: {
        toAdd: {},
        current: [],
        mode: {
            delete: false,
            toDelete: []
        }
    },
    devices: [],
    currentDevice: {},
    drawer: "show",
    newDevice: {
        name: "",
        address: "",
        message: null
    }
};

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer, 
    initialState,
    applyMiddleware(sagaMiddleware)
    );

sagaMiddleware.run(rootSaga);

export default store;