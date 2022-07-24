import axios from 'axios';
import {GET_ERRORS, SET_COMMENTS} from './types';


export const getComments = (container_id:string) => (dispatch:any) => {
    axios.get(`/api/comments/${container_id}`)
    .then((res) => {
        dispatch({
            type: SET_COMMENTS,
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

export const postComment = (container_id:string, message:string) => (dispatch:any) => {
    axios.post(`/api/comments/${container_id}`,{message: message})
    .then((res) => {
        dispatch(getComments(container_id));
    })
    .catch((err) => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
};

export const deleteComment = (comment_id:string, container_id:string) => (dispatch:any) => {
    axios.delete(`/api/comments/${comment_id}`)
    .then((res) => {
        dispatch(getComments(container_id));
    })
    .catch((err) => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
};
