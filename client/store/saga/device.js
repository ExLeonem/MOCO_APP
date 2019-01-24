import {ADD_NEW_DEVICE, REMOVE_DEVICE, SELECT_CURRENT_DEVICE, ENABLE_DEVICE, DISABLE_DEVICE} from '../constants';
import {addDevice, updateDeviceActive} from '../action/device';
import {setNewDeviceMessage} from '../action/new_device';
import {setCurrentDevice, updateCurrentDeviceActive} from '../action/current_device';
import {loadSchedules} from '../action/schedule';

import {AsyncStorage} from 'react-native';
import {takeLatest, put, call, select} from 'redux-saga/effects';

import Color from 'color';
import axios from 'axios';

// Server Endpoints
const endpoint = {
    get: () => "/api/v1/led_status",
    set: () => "/api/v1/set_led"
}

// Store selector functions
const getDevices = state => state.devices
const getStoredDevice = state => state.currentDevice

/**
 * Select a device
 */
export function* checkCurrentDevice() {
    yield takeLatest(SELECT_CURRENT_DEVICE, selectCurrentDevice);
}

function* selectCurrentDevice(action) {
    try {
        let devices = yield select(getDevices);
        let found = false;
        console.log("\n\nSearch device");
        console.log(action.url);
        for(let i = 0; i < devices.length; i++) {
            if(devices[i].url == action.url) {
                console.log("Selected");
                yield put(setCurrentDevice(devices[i]));
                yield put(loadSchedules()); // Load schedules initialy
                found = true;
                break;
            }
        }

        if(!found) {
            // TODO: device not found!? TOast
        }

    } catch(err) {
        console.log(err);
    }
}


export function* checkQuickEnableDevice() {
    yield takeLatest(ENABLE_DEVICE, quickSwitchLightOn(true));
}

export function* checkQuickDisableDevice() {
    yield takeLatest(DISABLE_DEVICE, quickSwitchLightOn(false));
}


function quickSwitchLightOn(isActive) {
    return function* (action) {
        try {
            let devices = yield select(getDevices);
            let currentDevice = yield select(getStoredDevice);
            let found = false;

            console.log("Turn to : " + isActive);
            for(let i = 0; i < devices.length; i++) {
                // Device found
                if(devices[i].url == action.url) {

                    let ledEntitiy = deviceToLed(devices[i]);
                    let params = [devices[i].url, {...ledEntitiy, on: isActive}]
                    let resp = yield call(updateLed, ...params);
                    found = true;

                    if(resp.status == 200) {
                        if("Ok" in resp.data) {
                            // Update was successful
                            yield put(updateDeviceActive(action.url, isActive));

                            // quick device is current device
                            if(currentDevice.url == action.url) {
                                yield put(updateCurrentDeviceActive(isActive));
                            }
                        } else if("error" in resp.data) {
                            // TODO: couldn't update led_status
                        }
                    } else {
                        // TODO: failed to update
                    }

                    // console.log(JSON.stringify(resp, null, 2));
                }
            }
        } catch(err) {
            console.log(err);
        }
    }
}

/**
 * Add a new device to the device list
 */
export function* checkOnAddDevice() {
    yield takeLatest(ADD_NEW_DEVICE, processDevice);
}


const getDeviceList = state => state.devices
function* processDevice(action) {
    try {
        const devices = yield select(getDeviceList)
        if(devices.length == 0) {
            // Devices empty insert instantly
            console.log("insert device");
            let name = action.name;
            let address = action.address;

            console.log(name);
            console.log(address);

            yield checkAndInsert(name, address);
            
        } else {
            // devices already exist, check if devices with url exists  
            let found = devices.find(device => device.url == action.address);
            
            // no device found
            if(!found) {
                yield checkAndInsert(action.name, action.address);
            } else {
                // !: put error message device already exists
                yield put(setNewDeviceMessage("Try another one, you registered this address already..."));
            }
        }

    } catch(error) {
        console.log(error);
        yield put(setNewDeviceMessage("could't connect to the device. Check your internet connectivity and the address."));
        // Error Message
    }
}

function* checkAndInsert(name, address) {

    // check if endpoint/device exists
    let resp = yield call(checkLed, address);

    if(resp.status == 200) {
        console.log(JSON.stringify(resp.data, null, 2));
        let {color, brightness, on} = resp.data;
        color = Color(color);
        
        // create device object and insert into application state
        let deviceObj = initNewDevice(name, address, color.hex(), brightness, on);

        yield put(addDevice(deviceObj));

        // insert new device into db
        // yield call(_storeNewDevice(name, address));
    } else {
        // TODO: error device doesent support connection
        console.log(JSON.stringify(resp, null, 2));
        yield put(setNewDeviceMessage("Thats not a smart lamp you want connect to. Double check the address mate."));
    }
}


/**
 * --------------------------------------
 *           SERVER REQUESTS
 * -------------------------------------
 */ 
function updateLed(url, data) {
    return axios.post(url + endpoint.set(), data);
}

function checkLed(url) {
    return axios.get(url + endpoint.get());
}

/**
 *  -------------------------------------
 *          DATABASE ACCESS
 *  -------------------------------------
 */



_storeNewDevice = async (name, address) => {
    try {
        await AsyncStorage.setItem(address, name); 
    } catch(err) {
        console.log(err);
    }
}

_getDevices = async (address) => {
    try {

    } catch(err) {
        
    }
}

_removeDevice = async (address) => {
    try {
        await AsyncStorage.removeItem(address);
    } catch(err) {
        console.log(err);
    }
}


/**
 *  -----------------------------------
 *              HELPER
 *  -----------------------------------
 */

function initNewDevice(name, address, color, brightness, isActive) {
    return {
        name: name,
        url: address,
        color: color,
        level: brightness,
        isActive: isActive
    }
}

function deviceToLed(device) {
    return {on: device.isActive, color: Color(device.color).rgb().array(), brightness: device.level, manuel: false};
}


function validAddress(url) {
    // Check if address is valid
}