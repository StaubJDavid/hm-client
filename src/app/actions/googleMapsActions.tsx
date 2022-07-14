import axios from 'axios';
import {GET_ERRORS,
    SET_MAP,
    SET_DIRECTION_RENDERER,
    SET_DIRECTION_SERVICE,
    SET_ENDPOINT,
    SET_STARTPOINT,
    SET_WAYPOINTS,
    DEL_WAYPOINTS,
    SET_DIRECTION_RESULTS
    } from './types';

import inputTimeFormat from '../helpers/inputTimeFormat';
import store from '../store';

export const setMap = (map: google.maps.Map) => (dispatch:any) => {
    dispatch({
        type: SET_MAP,
        payload: map
    })
};

export const setDirectionService = (directionService: google.maps.DirectionsService) => (dispatch:any) => {
    dispatch({
        type: SET_DIRECTION_SERVICE,
        payload: directionService
    })
};

export const setDirectionRenderer = (directionRenderer: google.maps.DirectionsRenderer) => (dispatch:any) => {
    directionRenderer.setMap(store.getState().maps.map);
    dispatch({
        type: SET_DIRECTION_RENDERER,
        payload: directionRenderer
    })
};

export const setStartPoint = (startPoint: string) => (dispatch:any) => {
    dispatch({
        type: SET_STARTPOINT,
        payload: startPoint
    })
};

export const setEndPoint = (endPoint: string) => (dispatch:any) => {
    dispatch({
        type: SET_ENDPOINT,
        payload: endPoint
    })
};

export const setWaypoints = (waypoints: Array<any>) => (dispatch:any) => {
    dispatch({
        type: SET_WAYPOINTS,
        payload: waypoints
    })
};

export const addWaypoints = (waypoints: string, index:number) => (dispatch:any) => {
    return new Promise((resolve, reject) => {
        let oldWaypoints:Array<any> = store.getState().maps.waypoints;
        let newWaypoints = [...oldWaypoints.slice(0,index), {location: waypoints, stopover:false}, ...oldWaypoints.slice(index)];
    
        /*if(oldWaypoints.length === 0){
            oldWaypoints.push(waypoints);
            newWaypoints = oldWaypoints;
        }*/
    
        dispatch({
            type: SET_WAYPOINTS,
            payload: newWaypoints
        })

        resolve(0);
    })
};

export const changeWaypoint = (waypoints: string, index:number) => (dispatch:any) => {
    let oldWaypoints:Array<any> = store.getState().maps.waypoints;
    let newWaypoints = [...oldWaypoints];

    newWaypoints[index].location = waypoints;

    dispatch({
        type: SET_WAYPOINTS,
        payload: [...newWaypoints]
    })
};

export const delWaypoint = (index:number) => (dispatch:any) => {
    /*console.log(index);
    let oldWaypoints:Array<any> = store.getState().maps.waypoints;
    let newWaypoints = oldWaypoints;
    newWaypoints.splice(index,1);*/

    /*if(oldWaypoints.length === 0){
        oldWaypoints.push(waypoints);
        newWaypoints = oldWaypoints;
    }*/

    dispatch({
        type: DEL_WAYPOINTS,
        payload: index
    })
};

export const removeEmptyEntries = () => (dispatch:any) => {
    let oldWaypoints:Array<any> = store.getState().maps.waypoints;
    let newWaypoints = oldWaypoints.filter((word:any) => word.location.length !== 0);

    /*if(oldWaypoints.length === 0){
        oldWaypoints.push(waypoints);
        newWaypoints = oldWaypoints;
    }*/

    dispatch({
        type: SET_WAYPOINTS,
        payload: newWaypoints
    })

    return newWaypoints;
};

export const setDirectionResult = (directionResults: google.maps.DirectionsResult) => (dispatch:any) => {
    dispatch({
        type: SET_DIRECTION_RESULTS,
        payload: directionResults
    })
};


//clear
