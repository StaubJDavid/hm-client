/* eslint-disable import/no-anonymous-default-export */
import { SET_UNAPPROVED_USERS } from "../actions/types";
import isEmpty from "../helpers/isEmpty";

const initialState = {
    unapprovedUsers: null
}

export default function(state = initialState, action:any){
    switch(action.type){
        case SET_UNAPPROVED_USERS: return {
            ...state,
            unapprovedUsers: action.payload
        }

        default: return state;
    }
}