import { LOGOUT, LOGIN } from '../actions';

const ReducerAuth = (state = [], action) => {
    switch(action.type){
        case LOGOUT:
            return {};
        case LOGIN:
            return {...state, user: action.user};
        default:
            return state;
    }
}

export default ReducerAuth;