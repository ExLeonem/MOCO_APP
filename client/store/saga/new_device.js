import {ADD_NEW_DEVICE, REMOVE_DEVICE} from '../constants';
import {addDevice} from '../action/device';
import {setNewDeviceMessage} from '../action/new_device';

import {AsyncStorage} from 'react-native';
import {takeLatest, put, call, select} from 'redux-saga';

import Color from 'color';
import axios from 'axios';

const serverEndpoint = "/api/v1/led_status";

export function* checkOnAddDevice() {
    yield takeLatest(ADD_NEW_DEVICE, processDevice);
}


const getDeviceList = state => state.devices
function* processDevice(action) {
    try {
        const devices = yield select(getDeviceList)
        if(!devices) {
            // Devices empty insert instantly
            let name = action.name;
            let address = action.address;
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
        yield put(setNewDeviceMessage("Coudln't connect to the device. Check your internet connectivity and the address."));
        // Error Message
    }
}

function* checkAndInsert(name, address) {

    // check if endpoint/device exists
    let resp = yield endpointExists(address + serverEndpoint);
    if(resp.status == 200 && "on" in resp.data) {
        let ledState = resp.data;
        let color = Color(ledState.color);
        
        // create device object and insert into application state
        let deviceObj = initNewDevice(name, address, color.hex(), ledState.brightness, ledState.on);
        yield put(addDevice(deviceObj));

        // insert new device into db
        yield call(_storeNewDevice(name, address));
    } else {
        // TODO: error device doesent support connection
        yield put(setNewDeviceMessage("Thats not a smart lamp you want connect to. Double check the address mate."));
    }
}


/**
 * --------------------------------------
 *           SERVER REQUESTS
 * -------------------------------------
 */ 
function endpointExists(url) {
    return axios.get(url);
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

function initNewDevice(name, address, color, level, isActive) {
    return {
        name: name,
        url: address,
        color: color,
        level: brightness,
        isActive: on
    }
}


function validAddress(url) {
    // Check if address is valid
}