import {ADD_DEVICE, REMOVE_DEVICE, RENAME_DEVICE} from '../constants';


const deviceReducer = (state = [] , action) => {
    let newState = state;
    switch(action.type) {
        case ADD_DEVICE: {

            break;
        }
        case REMOVE_DEVICE: {

            break;
        }
        case RENAME_DEVICE: {


            break;
        }
    }   
    return newState;
}


export default deviceReducer;