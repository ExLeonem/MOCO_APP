import {INIT_NEW_DEVICE, SET_NEW_DEVICE_NAME, SET_NEW_DEVICE_ADDRESS, SET_NEW_DEVICE_MESSAGE, ADD_NEW_DEVICE} from '../constants';

const initNewDevice = () => {return {type: INIT_NEW_DEVICE}}
const setNewDeviceName = name => {return {type: SET_NEW_DEVICE_NAME, name: name}}
const setNewDeviceAddress = address => {return {type: SET_NEW_DEVICE_ADDRESS, address: address}}
const addNewDevice = (name, address) => {return {type: ADD_NEW_DEVICE, name: name, address: address}}
const setNewDeviceMessage = (message) => {return {type: SET_NEW_DEVICE_MESSAGE, message: message}}


export {
    initNewDevice,
    addNewDevice,
    setNewDeviceName,
    setNewDeviceAddress,
    setNewDeviceMessage
}