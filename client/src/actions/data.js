import axios from 'axios';
import {
    GET_DATA
} from './types';
import {
    setAlert
} from './alert';

export const getData = () => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    try {
        const res = await axios.get('/transfer/data', config)
        
        dispatch({
            type: GET_DATA,
            payload: res.data
        })
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(
                setAlert(error.msg, 'danger')
            ));
        }

    }
}