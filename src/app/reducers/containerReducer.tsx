/* eslint-disable import/no-anonymous-default-export */
import { GET_CONTAINERS,
    GET_CONTAINER,
    CREATE_CONTAINER,
    DELETE_CONTAINER,
    CLEAR_CONTAINER,
    CLEAR_CONTAINERS
} from "../actions/types";
import isEmpty from "../helpers/isEmpty";

const initialState = {
    currentContainer: {},
    containers: {}
}

export default function(state = initialState, action:any){
    switch(action.type){
        case GET_CONTAINERS: return {
            ...state,
            containers:action.payload
        }
        case GET_CONTAINER: return {
            ...state,
            currentContainer:action.payload
        }

        case CREATE_CONTAINER: return {
            ...state,
            currentContainer:action.payload
        }

        case CLEAR_CONTAINER: return {
            ...state,
            currentContainer:action.payload
        }

        case DELETE_CONTAINER: return {
            ...state,
            currentContainer:{}
        }
        
        case CLEAR_CONTAINERS: return {
            ...state,
            containers:{}
        }

        default: return state;
    }
}