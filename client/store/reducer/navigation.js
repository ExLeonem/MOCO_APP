import {REPLACE_CURRENT_SCREEN, UPDATE_CURRENT_TAB} from '../constants';


let initialState = {
    currentScreen: {
        name: "main",
        activeTab: "",
    }
}


export default navigationReducer = (state = initialState, action) => {
    let newState = state;
    
    switch(action.type) {
        case REPLACE_CURRENT_SCREEN: {

            break;
        }
        case UPDATE_CURRENT_TAB: {

            break;
        }
    }
    return newState;
}