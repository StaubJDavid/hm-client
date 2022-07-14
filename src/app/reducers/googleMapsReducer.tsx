/* eslint-disable import/no-anonymous-default-export */
import { SET_DIRECTION_SERVICE,
    SET_DIRECTION_RENDERER,
    SET_ENDPOINT,
    SET_STARTPOINT,
    SET_WAYPOINTS,
    SET_MAP,
    DEL_WAYPOINTS,
    SET_DIRECTION_RESULTS
} from "../actions/types";
import isEmpty from "../helpers/isEmpty";

const initialState = {
    map: null,
    ownDirectionService: null,
    ownDirectionRenderer: null,
    endPoint: "",
    startPoint: "",
    waypoints: [],
    directionResults: null
}

export default function(state = initialState, action:any){
    switch(action.type){
        case SET_DIRECTION_SERVICE: return {
            ...state,
            ownDirectionService:action.payload
        }

        case SET_DIRECTION_RENDERER: return {
            ...state,
            ownDirectionRenderer:action.payload
        }

        case SET_ENDPOINT: return {
            ...state,
            endPoint:action.payload
        }

        case SET_STARTPOINT: return {
            ...state,
            startPoint:action.payload
        }

        case SET_WAYPOINTS: return {
            ...state,
            waypoints:action.payload
        }

        case SET_MAP: return {
            ...state,
            map: action.payload
        }

        case SET_DIRECTION_RESULTS: return {
            ...state,
            directionResults: action.payload
        }

        case DEL_WAYPOINTS: return {
            ...state,
            waypoints: [...state.waypoints.slice(0, action.payload), ...state.waypoints.slice(action.payload + 1)]
        }

        default: return state;
    }
}