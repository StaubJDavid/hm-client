import axios from 'axios';
import {GET_ERRORS, SET_CURRENT_USER, CLEAR_ERRORS} from './types';
import setAuthToken from '../helpers/setAuthToken';
import jwt_decode from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import history from "../helpers/history";

export const registerUser = (userData:any) => (dispatch:any) => {
    axios.post(`/api/auth/register`, 
        {name: userData.name,
        email: userData.email,
        password: userData.password,
        password2: userData.password2,
        message: userData.message
    }
    ).then(
        res => {
            dispatch({
                type: GET_ERRORS,
                payload: {register:"s"}
            })
        }
    ).catch(
        err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

export const loginUser = (userData:any) => (dispatch:any) => {
    axios.post(`/api/auth/login`, 
        {email: userData.email,
        password: userData.password}
    ).then(
        res => {
            const jwt = res.data.token;
            localStorage.setItem('JWT',jwt);
            setAuthToken(jwt);
            const decoded = jwt_decode(jwt);
            dispatch(setCurrentUser(decoded));
    }).catch(
        err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

export const setCurrentUser = (decoded:any) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = () => (dispatch:any) => {
    localStorage.removeItem('JWT');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
}

export const scuffed = () => (dispatch:any) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}