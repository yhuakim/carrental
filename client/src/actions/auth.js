import axios from 'axios';
import {
    REGISTERATION_SUCCESS,
    REGISTERATION_FAIL,
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT
} from './types';
import {
    setAlert
} from './alert';
import setAuthToken from '../utils/setAuthToken';

export const register = ({
    name,
    email,
    password,
    phone,
    address
}) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const body = JSON.stringify({
        name,
        email,
        password,
        phone,
        address
    });

    try {
        const res = await axios.post('/user/register', body, config);

        dispatch({
            type: REGISTERATION_SUCCESS,
            payload: res.data
        })

        dispatch(loadUser())

    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(
                setAlert(error.msg, 'danger')
            ));
        }

        dispatch({
            type: REGISTERATION_FAIL
        })
    }
}

export const login = (
    email,
    password
) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const body = JSON.stringify({
        email,
        password
    });

    try {
        const res = await axios.post('/auth/login', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })

        dispatch(loadUser())

    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(
                setAlert(error.msg, 'danger')
            ));
        }

        dispatch({
            type: LOGIN_FAILED
        })
    }
}

export const loadUser = () => async (dispatch) => {
    //User loading
    dispatch({
        type: USER_LOADING
    });

    if (localStorage.token) {
        setAuthToken(localStorage.token)
    } else {
        setAlert('No token', 'danger')
    }

    try {
        /* let config = {
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": `${localStorage.token}`
            }
        } */
        const res = await axios.get('/auth/user');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })

    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(
                setAlert(error.msg, 'danger')
            ));
        }

        dispatch({
            type: AUTH_ERROR,
        })
    }

}

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    })
}