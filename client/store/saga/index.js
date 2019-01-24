import {all, fork} from 'redux-saga/effects';

import {
    checkLedUpdate,
    updateColor,
    updateBrightness,
    checkDisableLight,
    checkEnableLight,
} from './current_device';

import { 
    checkScheduleToWrite, 
    checkLoadSchedules, 
    checkScheduleDelete,
    checkEnableSchedule,
    checkDisableSchedule
} from './schedule';

import { 
    checkOnAddDevice,
    checkCurrentDevice,
    checkQuickEnableDevice,
    checkQuickDisableDevice,
    checkLoadDevices
} from './device';

export default function* rootSaga() {
    yield all([
        // current device
        fork(checkLoadDevices),
        fork(checkLedUpdate),
        fork(updateColor),
        fork(updateBrightness),
        fork(checkEnableLight),
        fork(checkDisableLight),

        // device
        fork(checkOnAddDevice),
        fork(checkCurrentDevice),
        fork(checkQuickEnableDevice),
        fork(checkQuickDisableDevice),

        // Schedule
        fork(checkScheduleToWrite),
        fork(checkLoadSchedules),
        fork(checkScheduleDelete),
        fork(checkEnableSchedule),
        fork(checkDisableSchedule)
    ])
};