import axios from 'axios';
import {
    ADD_DATA,
    GET_DATA,
    DELETE_DATA,
    QUEUE_DATA
} from './types';
import {
    setAlert
} from './alert';

import { SEC_KEY } from '../config'

export const addData = ({
    bank_code,
    account_number,
    amount,
    currency,
    narration,
    reference
}) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const body = JSON.stringify({
        bank_code,
        account_number,
        amount,
        currency,
        narration,
        reference
    })

    try {
        const res = await axios.post('/transfer/new', body, config)

        dispatch({
            type: ADD_DATA,
            payload: res.data
        })

        dispatch(getData())

        console.log('success')

        dispatch(setAlert(res.data.message, 'success'))

    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(
                setAlert(error.msg, 'danger')
            ));
        }

    }
}

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

export const deleteData = (id) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    try {
        const res = await axios.delete(`/transfer/delete/${id}`, config)

        dispatch({
            type: DELETE_DATA,
            payload: res.data
        })

        dispatch(getData())

    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(
                setAlert(error.msg, 'danger')
            ));
        }

    }
}

export const queueData = (datas) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${SEC_KEY}`
        }
    }

    const body = JSON.stringify({
        "title": "staff salary",
        "bulk_data": datas
    })

    try {
        const res = await axios.post('https://cors-anywhere.herokuapp.com/https://api.flutterwave.com/v3/bulk-transfers', body, config)

        dispatch({
            type: QUEUE_DATA,
            payload: res.data
        })

        dispatch(getData())

        console.log('success')

        dispatch(setAlert(res.data.message, 'success'))

    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(
                setAlert(error.msg, 'danger')
            ));
        }

    }
}