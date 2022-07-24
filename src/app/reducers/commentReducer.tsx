/* eslint-disable import/no-anonymous-default-export */
import { SET_COMMENTS } from "../actions/types";
import isEmpty from "../helpers/isEmpty";

const initialState = {
    comments: null
}

export default function(state = initialState, action:any){
    switch(action.type){
        case SET_COMMENTS: return {
            ...state,
            comments: action.payload
        }

        default: return state;
    }
}