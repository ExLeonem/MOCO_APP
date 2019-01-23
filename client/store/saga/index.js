import {all, fork} from 'redux-saga/effects';

import {
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

import { checkOnAddDevice } from './device';

export default function* rootSaga() {
    yield all([
        // current device
        fork(updateColor),
        fork(updateBrightness),
        fork(checkEnableLight),
        fork(checkDisableLight),

        // device
        fork(checkOnAddDevice),

        // Schedule
        fork(checkScheduleToWrite),
        fork(checkLoadSchedules),
        fork(checkScheduleDelete),
        fork(checkEnableSchedule),
        fork(checkDisableSchedule)
    ])
};