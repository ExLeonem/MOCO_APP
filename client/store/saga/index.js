import {all, fork} from 'redux-saga/effects';

import {
    updateColor,
    updateBrightness,
    checkDisableLight,
    checkEnableLight
} from './current_device';


export default function* rootSaga() {
    yield all([
        fork(updateColor),
        fork(updateBrightness),
        fork(checkEnableLight),
        fork(checkDisableLight)
    ])
};