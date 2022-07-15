import axios from 'axios';
import {GET_ERRORS,
    SET_UPCOMING_CONTAINERS,
    SET_PAST_CONTAINERS,
    SET_INPROGRESS_CONTAINERS,
    GET_CONTAINER,
    CREATE_CONTAINER,
    DELETE_CONTAINER,
    CLEAR_CONTAINER,
    CLEAR_CONTAINERS
    } from './types';

import inputTimeFormat from '../helpers/inputTimeFormat';

export const getUpcomingContainers = (offset:number, currentPage:number, limit:number) => (dispatch:any) => {
    axios.get(`/api/container/upcoming`,{params:{limit:limit, offset:offset}})
    .then (res => {
        res.data.currentPage = currentPage;
        dispatch({
            type: SET_UPCOMING_CONTAINERS,
            payload: res.data
        })
    }).catch(
        err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    )
};

export const getPastContainers = (offset:number, currentPage:number, limit:number) => (dispatch:any) => {
    console.log("WATSA");
    axios.get(`/api/container/past`,{params:{limit:limit, offset:offset}})
    .then (res => {
        res.data.currentPage = currentPage;
        dispatch({
            type: SET_PAST_CONTAINERS,
            payload: res.data
        })
    }).catch(
        err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    )
};

export const getInProgressContainers = (offset:number, currentPage:number, limit:number) => (dispatch:any) => {
    axios.get(`/api/container/inprogress`,{params:{limit:limit, offset:offset}})
    .then (res => {
        res.data.currentPage = currentPage;
        dispatch({
            type: SET_INPROGRESS_CONTAINERS,
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
    axios.get(`/api/container/container/${container_id}`)
    .then (res => {
        //console.log(res.data);
        dispatch({
            type: GET_CONTAINER,
            payload: res.data
        })
    }).catch(
        err => {
            //console.log(err.response);
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        }
    )
};

export const deleteContainer = (container_id:any) => (dispatch:any) => {
    axios.delete(`/api/container/${container_id}`)
    .then (res => {
        dispatch({
            type: DELETE_CONTAINER,
            payload: res.data
        });
    }).catch(
        err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    )
};

export const createContainer = (container:any) => async (dispatch:any) => {
    try {
        const result = await axios.post(`/api/container`,{
            role:container.role,
            title:container.title,
            message:container.message,
            time_start:inputTimeFormat(container.time_start),
            time_end:inputTimeFormat(container.time_end),
            trip_start:container.trip_start,
            trip_end:container.trip_end,
            waypoints:container.waypoints
        })
        /*dispatch({
            type: CREATE_CONTAINER,
            payload: result.data
        });*/
        //console.log(result);
        return result.data.container_id;
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error
        });
        return "";
    }
    
    

    //console.log(result);
    /*.then (res => {
        dispatch({
            type: CREATE_CONTAINER,
            payload: res.data
        });
        return true;
    }).catch(
        err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
            return false;
        }
    )*/
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