import {INIT_NEW_DEVICE, SET_NEW_DEVICE_NAME, SET_NEW_DEVICE_ADDRESS} from '../constants';

const initNewDevice = () => {return {type: INIT_NEW_DEVICE}}
const setNewDeviceName = name => {return {type: SET_NEW_DEVICE_NAME, name: name}}
const setNewDeviceAddress = address => {return {type: SET_NEW_DEVICE_ADDRESS, address: address}}


export {
    initNewDevice,
    setNewDeviceName,
    setNewDeviceAddress,
}