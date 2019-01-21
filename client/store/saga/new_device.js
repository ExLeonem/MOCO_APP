import {ADD_NEW_DEVICE, REMOVE_DEVICE} from '../constants';
import {addDevice} from '../action/device';

import {AsyncStorage} from 'react-native';
import {takeLatest, put, call, select} from 'redux-saga';


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
            yield addDevice(name, address);
        } else {
            // devices already exist, check if devices with url exists  
            let found = devices.find(device => device.url == action.address);

            // no device found
            if(!found) {
                yield addDevice(action.name, action.address);
            } else {
                // !: put error message device already exists
            }
        }

    } catch(error) {
        console.log(error);
        // Error Message
    }
}

function* insertDevice(name, address) {
    yield call(_storeNewDevice(name, address));

    // Add device to current store
    let newDevice = initNewDevice(name, address);
    yield put(addDevice(newDevice));
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

function initNewDevice(name, address) {
    return {
        name: name,
        url: address,
        color: "#FFFF00",
        level: 10,
        isActive: false
    }
}


function validAddress(url) {
    // Check if address is valid
}