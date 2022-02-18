/* eslint-disable import/no-anonymous-default-export */
import { ADD_IMAGES,
        CLEAR_IMAGES,
        DELETE_IMAGE 
} from "../actions/types";
import isEmpty from "../helpers/isEmpty";

const initialState = {
    images: []
}

export default function(state = initialState, action:any){
    switch(action.type){
        case ADD_IMAGES: return {
            ...state,
            images:[...state.images, ...action.payload]
        }

        case CLEAR_IMAGES: return {
            ...state,
            images:[]
        }

        case DELETE_IMAGE: return {
            ...state,
            images:action.payload
        }

        default: return state;
    }
}