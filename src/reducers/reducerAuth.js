import { LOGOUT, SIGNIN } from '../actions';

const ReducerAuth = (state = [], action) => {
    switch(action.type){
        case LOGOUT:
            return {};
        case SIGNIN:
            return {...state, user: action.user};
        default:
            return state;
    }
}

export default ReducerAuth;