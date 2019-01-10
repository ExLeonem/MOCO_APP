import {call, select, takeLatest} from 'redux-saga/effects';
import Color from 'color';
import axios from 'axios';

import {
    SET_CURRENT_DEVICE_COLOR, 
    SET_CURRENT_DEVICE_LEVEL,
    ENABLE_CURRENT_DEVICE,
    DISABLE_CURRENT_DEVICE
} from '../constants';

// Request currently stored device
const getStoredDevice = state => state.currentDevice

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
        let isActive = action.isActive;
        let url = currentDeviceData.url + "/set_led";

        // Create Object for server insertion
        let toUpdate = {on: isActive, color: Color(currentDeviceData.color).rgb().array()};
        let postObject = generatePostObject(currentDeviceData, toUpdate);

        // Make HTTP Request
        let params = [url, postObject];
        let postState = yield call(setDeviceData, ...params);

        // Check response
        if(postState.status == 200 && postState.data["error"] != undefined) {
             // TODO: feedback post request error
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
        let level = action.level;
        let url = currentDeviceData.url + "/set_led";

        // Create object for server insertion
        let toUpdate = {brightness: level, color: Color(currentDeviceData.color).rgb().array()};
        let postObject = generatePostObject(currentDeviceData, toUpdate);

        // Make HTTP Request
        let params = [url, postObject];
        let postState = yield call(setDeviceData, ...params);

        // Check response
        if(postState.status == 200 && postState.data["error"] != undefined) {
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
        let color = Color(currentDeviceData.color);
        let url = currentDeviceData.url + "/set_led";

        // Create object for server insertion
        let postObject = generatePostObject(currentDeviceData, {color: color.rgb().array()});

        // Make HTTP Request
        let params = [url, postObject];
        let postState = yield call(setDeviceData, ...params);

        // Check response
        if(postState.status == 200 && postState.data["error"] != undefined) {
            // TODO: feedback post request error
        }
    } catch(err) {
        console.log(err);
        
    }
}


/**
 * -------------------------------------
 *              SERVER REQUESTS
 * -------------------------------------
 */
function setDeviceData(url, postObject) {
    console.log("POST");
    return axios.post(url, postObject);
}

function getDeviceData(url) {
    console.log("GET");
    return axios.get(url);
}

/**
 * ------------------------------------
 *              HELPER
 * ------------------------------------
 */
 function generatePostObject(currentData, paramsToSet) {
     let {on, color, brightness} = paramsToSet;

     return {
         on: on ? on: currentData.isActive,
         color: color ? color : currentData.color,
         brightness: brightness ? brightness : currentData.level,
         manuel: true
     }
 }
