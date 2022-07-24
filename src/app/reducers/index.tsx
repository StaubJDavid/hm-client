import {combineReducers} from 'redux';
import authReducer from './authReducer';
import containerReducer from './containerReducer';
import errorReducer from './errorReducer';
import uploadReducer from './uploadReducer';
import googleMapsReducer from './googleMapsReducer';
import adminReducer from './adminReducer';
import commentReducer from './commentReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    upload: uploadReducer,
    container: containerReducer,
    maps: googleMapsReducer,
    admin: adminReducer,
    comments: commentReducer,
});