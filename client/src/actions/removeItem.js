import axios from 'axios';
import {
    DELETE
} from './types';
import {
    setAlert
} from './alert';

export const deleteData = ({id}) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    try {
        const data = await axios.delete(`/transfer/delete/:${id}`, config)
        dispatch({
            type: DELETE,
            payload: {
                data,
                id
            }
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