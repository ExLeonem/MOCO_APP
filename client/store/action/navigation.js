import {REPLACE_CURRENT_SCREEN, UPDATE_CURRENT_TAB} from '../constants';


const replaceCurrentScreen = (nextScreen) => {
    return {
        type: REPLACE_CURRENT_SCREEN,
        nextScreen: nextScreen
    }
}


const updateCurrentTab = (activeTab) => {
    return {
        type: UPDATE_CURRENT_TAB,
        activeTab: activeTab
    }
}


export {
    replaceCurrentScreen,
    updateCurrentTab
}