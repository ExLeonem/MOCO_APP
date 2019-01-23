import {REMOVE_SCHEDULES, NEW_SCHEDULE_INSERT, LOAD_SCHEDULES, ENABLE_SCHEDULE, DISABLE_SCHEDULE} from '../constants';
import {addSchedule, setSchedules, removeStoreSchedules} from '../action/schedule'

import {takeLatest, put, call, select} from 'redux-saga/effects';
import axios from 'axios';
import Color from 'color';

// TODO: load schedules initialy from server

// TODO: method to merge existing schedules
const endpoint = {
    schedules: () => "/api/v1/schedules", // request all schedules
    schedule: id => "/api/v1/schedule" + (!id? "" : "/" + id), // remove, add, update

};

export function* checkScheduleToWrite() {
    yield takeLatest(NEW_SCHEDULE_INSERT, checkAndAdd);
}

const getStoreSchedules = state => state.schedules.toAdd
const getCurrentDevice = state => state.currentDevice
function* checkAndAdd(action) {
    try {
        let toAdd = yield select(getStoreSchedules);
        let currentDevice = yield select(getCurrentDevice);

        let scheduleEntity = createScheduleEntity(currentDevice.name, toAdd);
        let params = [currentDevice.url, scheduleEntity];
        let resp = yield call(insertSchedule, ...params);

        if(resp.status == 200) {
            let data = resp.data;
            if("error" in data) {
                // TODO: response returned error
            } else {
                let params = {
                    deviceUrl: currentDevice.url,
                    repeat: scheduleEntity.repeat
                };
                let scheduleStoreEnt = createScheduleStoreEntity(data, params);
                yield put(addSchedule(scheduleStoreEnt));
            }
        }  else {
            // TODO: error message -> no connection to serve?
        }

    } catch(err) {
        console.log(err);
        // On error
    }
}

export function* checkLoadSchedules() {
    yield takeLatest(LOAD_SCHEDULES, loadDeviceSchedules);
}

function* loadDeviceSchedules(action) {
    // yield takeLatest();
    try {
        let currentDevice = yield select(getCurrentDevice);
        let resp = yield call(getSchedules, currentDevice.url);

        if(resp.status == 200) {
            let params = {
                deviceUrl: currentDevice.url,
                repeat: []
            };

            let schedules = resp.data.map(schedule => createScheduleStoreEntity(schedule, params))
            yield put(setSchedules(schedules))
        } else {
            // TODO: failed request
        }

    } catch(err) {
        // Something failed
        console.log(err);
    }
}


export function* checkScheduleDelete() {
    yield takeLatest(REMOVE_SCHEDULES, removeSchedule)
}

const getRemoveSchedules = state => state.schedules.mode.toDelete
function* removeSchedule(action) {
    // TODO: umstellen auf liste
    
    try {
        let currentDevice = yield select(getCurrentDevice);
        let schedulesToDelete = yield select(getRemoveSchedules);


        if(schedulesToDelete.length > 0) {
            for(let i = 0; i < schedulesToDelete.length; i++) {
                let resp = yield call(deleteSchedule, currentDevice.url, schedulesToDelete[i]);
                if(resp.status == 200) {
                    // successfull delete
                } else {
                    // failed error msg and break
                }
            }
        }
        
        yield put(removeStoreSchedules());

    } catch(err) {
        // store access or something else failed
        console.log(err);
    }
}


export function* checkEnableSchedule() {
    yield takeLatest(ENABLE_SCHEDULE, switchActiveTo(true));
}

export function* checkDisableSchedule() {
    yield takeLatest(DISABLE_SCHEDULE, switchActiveTo(false));
}

const getCurrentSchedules = state => state.schedules.current
function switchActiveTo(isActive) {
    return function* (action) {
        try {
    
            let currentDevice = yield select(getCurrentDevice);
            let currentSchedules = yield select(getCurrentSchedules);
            // Search for schedule data and send update request
            for(let i = 0; i < currentSchedules.length; i++) {
                if(action.scheduleId == currentSchedules[i].id) {
                    // schedule found
                    let schedule = currentSchedules[i];
                    let updatedScheduleEntity = createScheduleEntity(currentDevice.name, {...schedule, active: isActive});

                    let params = [currentDevice.url, action.scheduleId, {...updatedScheduleEntity, running: false}];
                    let resp = yield call(updateSchedule, ...params);
    
                    if(resp.status == 200) {
                        // TODO: check if error response
                    } else {
                        // TODO: request error
                    }

                    break;
                }
            }
        } catch(err) {
            console.log(err);
        }
    }
}


/**
 * ##############################
 *           NETWORK
 * ##############################
 */
function getSchedules(url) {
    return axios.get(url + endpoint.schedules())
}

function getSchedule(url, id) {
    return axios.get(url + endpoint.schedule(id))
}

function insertSchedule(url, data) {
    return axios.post(url + endpoint.schedule(), data)   
}

function deleteSchedule(url, id) {
    return axios.delete(url + endpoint.schedule(id));
}

function updateSchedule(url, id, data) {
    return axios.put(url + endpoint.schedule(id), data)
}

/**
 * #################################
 *           CHECK STORE
 * #################################
 */
function createScheduleEntity(deviceName, schedule) {

    return {
        "device": deviceName,
        "integration": "manuel",
        "led_setting" : {
                "mode": "Default",
                "color": Color(schedule.color).rgb().array()
            },
        "activation_time": createScheduleDate(schedule.time, schedule.date),
        "active": "active" in schedule ? schedule.active: true,
        "repeat": schedule.repeat
    };    
}

function createScheduleStoreEntity(schedule, info) {
    let {time, date} = parseDate(schedule.activation_time);
    return {
        id: schedule.id,
        url: info.deviceUrl,
        color: Color(schedule.led_setting.color).hex(),
        date: date,
        time: time,
        repetitionPattern: 'week',
        repeat: info.repeat,
        isActive: schedule.active,
    }
}


/**
 * #################################
 *             HELPER
 * #################################
 */

// Extract time/date from utc-date-string
function parseDate(utcDate) {

    // create human read-able format
    let actDate = new Date(utcDate);
    let date = actDate.getDate() + "." + actDate.getMonth() + "." + actDate.getFullYear();
    

    // parse time to another format
    let hours = parseInt(actDate.getHours());
    let minutes = parseInt(actDate.getMinutes());
    let time = hours < 10 ? ("0" + hours.toString()) : hours.toString();
    time += ":" + (minutes < 10 ? ("0" + minutes.toString()) : minutes.toString());

    return {
        time: time,
        date: actDate 
    }
}
// Check wether hours/minutes before current time
function createScheduleDate(time, date) {
    let splittedTime = time.split(":");
    let hours = parseInt(splittedTime[0]);
    let minutes = parseInt(splittedTime[1]);

    if(date.getHours() > hours || (date.getHours() == hours && date.getMinutes() >= minutes)) {
        // Schedule time before current time -> set schedule for tomorrow
        // Add 1 - day to current date;
        date.setHours(hours);
        date.setMinutes(minutes);
        let newDate =  new Date(date.setTime(date.getTime() + 1 * 86400000)).toISOString();
        return newDate.slice(0, newDate.length -1);
    } 

    date.setHours(hours);
    date.setMinutes(minutes);
    let isoDate = date.toISOString();
return isoDate.slice(0, isoDate.length-1);
}