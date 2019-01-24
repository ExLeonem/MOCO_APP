import {call, select, takeLatest, put} from 'redux-saga/effects';
import Color from 'color';
import axios from 'axios';

import {
    SET_CURRENT_DEVICE_COLOR, 
    SET_CURRENT_DEVICE_LEVEL,
    ENABLE_CURRENT_DEVICE,
    DISABLE_CURRENT_DEVICE,
    UPDATE_CURRENT_DEVICE
} from '../constants';

import { updateDeviceActive } from '../action/device';
import { updateCurrentDeviceActive, setCurrentDeviceLevel, setCurrentDeviceColor, updateCurrentDeviceStore } from '../action/current_device';

// Request currently stored device
const getStoredDevice = state => state.currentDevice
const getDevices = state => state.devices

// endpoints for led access
const endpoints = {
    get: () => '/api/v1/led_status',
    set: () => '/api/v1/set_led'
}


/**
 * Check current state of led and update
 */
export function* checkLedUpdate() {
    yield takeLatest(UPDATE_CURRENT_DEVICE, pollCurrentLed);
}

// update function for led values
function* pollCurrentLed(action) {
    try {
        console.log(action.url);
        let resp = yield call(getLed, action.url);
        
        if(resp.status == 200) {
            // Success
            let currentDevice = yield select(getStoredDevice);
            let {on, color, brightness} = resp.data;
            color = Color(color);

            if(color.hex() != Color(currentDevice.color).hex() || on != currentDevice.isActive || brightness != currentDevice.level) {
                yield put(updateCurrentDeviceStore(color.hex(), brightness, on));
            }
        } else {
            // TODO: Request error
        }

    } catch(err) {
        console.log(err);
    }
}


/**
 * Routine for device light on/off
 */
export function* checkEnableLight() {
    yield takeLatest(ENABLE_CURRENT_DEVICE, changeLight);
}

export function* checkDisableLight() {
    yield takeLatest(DISABLE_CURRENT_DEVICE, changeLight);
}

function* changeLight(action) {
    try {
        // Collect data
        let currentDeviceData = yield select(getStoredDevice);
        let devices = yield select(getDevices);
        let isActive = action.isActive;
        let brightness = currentDeviceData.level;
        let url = currentDeviceData.url;

        // Create Object for server insertion
        let toUpdate = {on: isActive, color: Color(currentDeviceData.color).rgb().array(), brightness: brightness};
        let postObject = generatePostObject(currentDeviceData, toUpdate);

        // Make HTTP Request
        let params = [url, postObject];
        let postState = yield call(setLed, ...params);

        // Check response
        if(postState.status == 200) {
            if("Ok" in postState.data) {
                // Successful
                yield put(updateCurrentDeviceActive(isActive));
                for(let i = 0; i < devices.length; i++) {
                    if(devices[i].url == currentDeviceData.url) {
                        yield put(updateDeviceActive(currentDeviceData.url, isActive))
                    }
                }   
            } else {
                // TODO: Error from server
            }
        } else {
            // TODO: request error
        }

    } catch(err) {
        console.log(err);
    }
}

/**
 * Routine for device brightness change
 */
export function* updateBrightness() {
    yield takeLatest(SET_CURRENT_DEVICE_LEVEL, changeDeviceBrightness)
}

function* changeDeviceBrightness(action) {
    try {
        // Collect data
        let currentDeviceData = yield select(getStoredDevice);
        let on = currentDeviceData.isActive;
        let level = action.level;
        let url = currentDeviceData.url;

        // Create object for server insertion
        let toUpdate = {brightness: level, color: Color(currentDeviceData.color).rgb().array(), on: on};
        let postObject = generatePostObject(currentDeviceData, toUpdate);

        // Make HTTP Request
        let params = [url, postObject];
        let postState = yield call(setLed, ...params);


        console.log(JSON.stringify(postState, null, 2));

        // Check response
        if(postState.status == 200) {
             // TODO: feedback post request error
        }
    } catch(err) {
        console.log(err);
    }
}

/**
 * Routine for device color change
 */
export function* updateColor() {
    yield takeLatest(SET_CURRENT_DEVICE_COLOR, changeDeviceColor)
}

function* changeDeviceColor() {
    try {
        // Collect data
        let currentDeviceData = yield select(getStoredDevice)
        let on = currentDeviceData.isActive;
        let brightness = currentDeviceData.level;
        let color = Color(currentDeviceData.color);
        let url = currentDeviceData.url;

        // Create object for server insertion
        let postObject = generatePostObject(currentDeviceData, {on: on, brightness: brightness, color: color.rgb().array()});

        // Make HTTP Request
        let params = [url, postObject];
        let postState = yield call(setLed, ...params);

        console.log(JSON.stringify(postState, null, 2));

        // Check response
        // if(postState.status == 200 ) {
        //     // TODO: feedback post request error
        //     if("Ok" in postState.data) {
        //         yield put(setCurrentDeviceColor())
        //     }
        // }
    } catch(err) {
        console.log(err);
        
    }
}


/**
 * -------------------------------------
 *              SERVER REQUESTS
 * -------------------------------------
 */
function setLed(url, postObject) {
    return axios.post(url + endpoints.set(), postObject);
}

function getLed(url) {
    return axios.get(url + endpoints.get());
}

/**
 * ------------------------------------
 *              HELPER
 * ------------------------------------
 */
 function generatePostObject(currentData, paramsToSet) {
     let {on, color, brightness} = paramsToSet;

     return {
         on: on,
         color: color ? color : currentData.color,
         brightness: brightness ? brightness : currentData.level
     }
 }
