/* eslint-disable import/no-anonymous-default-export */
import { SET_UPCOMING_CONTAINERS,
    SET_PAST_CONTAINERS,
    SET_INPROGRESS_CONTAINERS,
    GET_CONTAINER,
    CREATE_CONTAINER,
    DELETE_CONTAINER,
    CLEAR_CONTAINER,
    CLEAR_CONTAINERS
} from "../actions/types";
import isEmpty from "../helpers/isEmpty";

const initialState = {
    currentContainer: {},
    upcomingContainers: {},
    pastContainers: {},
    inProgressContainers: {}
}

export default function(state = initialState, action:any){
    switch(action.type){
        case SET_UPCOMING_CONTAINERS: return {
            ...state,
            upcomingContainers:action.payload
        }
        case SET_PAST_CONTAINERS: return {
            ...state,
            pastContainers:action.payload
        }
        case SET_INPROGRESS_CONTAINERS: return {
            ...state,
            inProgressContainers:action.payload
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
            currentContainer:{}
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