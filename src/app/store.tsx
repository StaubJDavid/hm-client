import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { composeWithDevTools } from '@redux-devtools/extension';

const initialState = {};

const middleware = [thunk];

/*const actionSanitizer = (action:any) => (
    action.type === 'SET_MAP' && action.data ?
    { ...action, data: '<<LONG_BLOB>>' } : action
  );*/

const store = createStore(
    rootReducer, 
    initialState, 
    composeWithDevTools(
        applyMiddleware(...middleware)
    )
);

/*const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(...middleware)
));*/

/*const store = createStore(rootReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({
    actionSanitizer,
    stateSanitizer: (state:any) => state.data ? { ...state, data: '<<LONG_BLOB>>' } : state
}));*/

export default store;