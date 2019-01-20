import {SET_DRAWER_SHOW, SET_DRAWER_ADD} from '../constants';

let initial_state = {
    state: "show",
    tmp: null
}

const drawerReducer = (state = initial_state, action) => {

    let newState = state;

    switch(action.type) {
        case SET_DRAWER_SHOW: {
            newState = "show";
            break;
        }
        case SET_DRAWER_ADD: {
            newState = "add"
            break;
        }
    }

    return newState;
}

export default drawerReducer;