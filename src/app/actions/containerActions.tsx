import axios from 'axios';
import {GET_ERRORS,
    SET_UPCOMING_CONTAINERS,
    SET_PAST_CONTAINERS,
    SET_INPROGRESS_CONTAINERS,
    GET_CONTAINER,
    CREATE_CONTAINER,
    DELETE_CONTAINER,
    CLEAR_CONTAINER,
    CLEAR_CONTAINERS,
    DELETE_REACTION,
    INSERT_REACTION,
    UPDATE_REACTION,
    } from './types';

import inputTimeFormat from '../helpers/inputTimeFormat';
import store from '../store';

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
    
    
};

export const postReaction = (container_id:any, reaction:any, reaction_id:any, index:any) => (dispatch:any) => {
    axios.post(`/api/container/reaction/${container_id}`, {reaction: reaction, reaction_id: reaction_id})
    .then (res => {
        const oldContainer = store.getState().container.upcomingContainers.data;
        const userId = store.getState().auth.user.id;
        let newContainer = JSON.parse(JSON.stringify(oldContainer));
        //console.log(newContainer);
        //console.log(res.data);
        if(res.data.route === "delete"){
            //console.log("Delete Route");
            newContainer[index].own_reaction = "none";
            newContainer[index].reaction_id = null;
            newContainer[index].reactions[reaction]--;

            const reactedUserIndex = newContainer[index].reacted_users.findIndex((o:any) => {
                return o.user_id === userId;
            })

            newContainer[index].reacted_users.splice(reactedUserIndex,1);

            dispatch({
                type: DELETE_REACTION,
                payload: newContainer
            })

        }else if(res.data.route === "update"){
            //console.log("Update Route");
            newContainer[index].reactions[newContainer[index].own_reaction]--;
            newContainer[index].reactions[reaction]++;
            newContainer[index].own_reaction = reaction;
            newContainer[index].reaction_id = reaction_id;

            const reactedUserIndex = newContainer[index].reacted_users.findIndex((o:any) => {
                return o.user_id === userId;
            })
            console.log(reactedUserIndex);
            newContainer[index].reacted_users[reactedUserIndex].reaction = reaction;

            dispatch({
                type: UPDATE_REACTION,
                payload: newContainer
            })

        }else if(res.data.route === "insert"){
            //console.log(res.data);
            const {reacted_users, success} = res.data;
            //console.log("Insert Route");
            newContainer[index].own_reaction = success[0].reaction;
            newContainer[index].reaction_id = success[0].tr_id;
            newContainer[index].reactions[success[0].reaction]++;

            newContainer[index].reacted_users.push(reacted_users[0]);

            dispatch({
                type: INSERT_REACTION,
                payload: newContainer
            })
        }
    }).catch(
        err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    )
};

export const postReactionPage = (container_id:any, reaction:any, reaction_id:any, index:any) => (dispatch:any) => {
    axios.post(`/api/container/reaction/${container_id}`, {reaction: reaction, reaction_id: reaction_id})
    .then (res => {
        console.log(res.data);
        const oldContainer = store.getState().container.currentContainer;
        const userId = store.getState().auth.user.id;
        let newContainer = JSON.parse(JSON.stringify(oldContainer));
        //console.log(newContainer);
        //console.log(res.data);
        if(res.data.route === "delete"){
            //console.log("Delete Route");
            newContainer.own_reaction = "none";
            newContainer.reaction_id = null;
            newContainer.reactions[reaction]--;

            const reactedUserIndex = newContainer.reacted_users.findIndex((o:any) => {
                return o.user_id === userId;
            })

            newContainer.reacted_users.splice(reactedUserIndex,1);

            console.log(newContainer);
            console.log(oldContainer);

            dispatch({
                type: GET_CONTAINER,
                payload: newContainer
            })

        }else if(res.data.route === "update"){
            //console.log("Update Route");
            newContainer.reactions[newContainer.own_reaction]--;
            newContainer.reactions[reaction]++;
            newContainer.own_reaction = reaction;
            newContainer.reaction_id = reaction_id;

            const reactedUserIndex = newContainer.reacted_users.findIndex((o:any) => {
                return o.user_id === userId;
            })
            console.log(reactedUserIndex);
            newContainer.reacted_users[reactedUserIndex].reaction = reaction;

            dispatch({
                type: GET_CONTAINER,
                payload: newContainer
            })

        }else if(res.data.route === "insert"){
            //console.log(res.data);
            const {reacted_users, success} = res.data;
            //console.log("Insert Route");
            newContainer.own_reaction = success[0].reaction;
            newContainer.reaction_id = success[0].tr_id;
            newContainer.reactions[success[0].reaction]++;

            newContainer.reacted_users.push(reacted_users[0]);

            dispatch({
                type: GET_CONTAINER,
                payload: newContainer
            })
        }
    }).catch(
        err => {
            /*dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })*/
            console.log(err);
        }
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