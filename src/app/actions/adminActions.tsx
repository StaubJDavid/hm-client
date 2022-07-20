import axios from 'axios';
import {GET_ERRORS, SET_UNAPPROVED_USERS} from './types';


export const getUnapprovedUsers = () => (dispatch:any) => {
    axios.get(`/api/admin/unconfirmed`)
    .then((res) => {
        dispatch({
            type: SET_UNAPPROVED_USERS,
            payload: res.data
        })
    })
    .catch((err) => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
};

export const approveUser = (id:any) => (dispatch:any) => {
    axios.post(`/api/admin/approve`,{user_id: id})
    .then((res) => {
        dispatch(getUnapprovedUsers());
    })
    .catch((err) => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
};

export const refuseUser = (id:any) => (dispatch:any) => {
    axios.post(`/api/admin/refuse`,{user_id: id})
    .then((res) => {
        dispatch(getUnapprovedUsers());
    })
    .catch((err) => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
};
