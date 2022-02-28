import axios from 'axios';
import {GET_ERRORS,
    GET_CONTAINERS,
    GET_CONTAINER,
    CREATE_CONTAINER,
    DELETE_CONTAINER,
    CLEAR_CONTAINER,
    CLEAR_CONTAINERS
    } from './types';

import inputTimeFormat from '../helpers/inputTimeFormat';

export const getContainers = () => (dispatch:any) => {
    axios.get(`/api/container`)
    .then (res => {
        dispatch({
            type: GET_CONTAINERS,
            payload: res.data
        })
    }).catch(
        err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    )
};

export const getContainer = (container_id:any) => (dispatch:any) => {
    axios.get(`/api/container/${container_id}`)
    .then (res => {
        dispatch({
            type: GET_CONTAINER,
            payload: res.data
        })
    }).catch(
        err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    )
};

export const deleteContainer = (container_id:any) => (dispatch:any) => {
    axios.delete(`/api/container/${container_id}`)
    .then (res => {
        dispatch({
            type: DELETE_CONTAINER,
            payload: res.data
        })
    }).catch(
        err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    )
};

export const createContainer = (container:any) => (dispatch:any) => {
    axios.post(`/api/container`,{
        role:container.role,
        title:container.title,
        message:container.message,
        time_start:inputTimeFormat(container.time_start),
        time_end:inputTimeFormat(container.time_end),
    })
    .then (res => {
        dispatch({
            type: CREATE_CONTAINER,
            payload: res.data
        })
    }).catch(
        err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    )
};

export const clearContainer = () => (dispatch:any) => {
    dispatch({
        type: CLEAR_CONTAINER
    })
};

export const clearContainers = () => (dispatch:any) => {
    dispatch({
        type: CLEAR_CONTAINERS
    })
};