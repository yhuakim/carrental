import axios from 'axios';
import {
    ADD_DATA,
    GET_DATA
} from './types';
import {
    setAlert
} from './alert';

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
    });

    console.log(body)

    try {
        const res = await axios.post('transfer/new', body, config);
        const dat = await axios.get('transfer/data', config)
        dispatch({
            type: ADD_DATA,
            payload: res.data
        })

        dispatch({
            type: GET_DATA,
            payload: dat.data.data
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