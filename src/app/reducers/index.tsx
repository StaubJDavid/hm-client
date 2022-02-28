import {combineReducers} from 'redux';
import authReducer from './authReducer';
import containerReducer from './containerReducer';
import errorReducer from './errorReducer';
import uploadReducer from './uploadReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    upload: uploadReducer,
    container: containerReducer
});