import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import ReducerAuth from './reducerAuth';

const rootReducer = combineReducers({
  form: formReducer,
  auth: ReducerAuth
});

export default rootReducer;
