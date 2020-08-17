import {
    GET_DATA
} from '../actions/types';

const initialState = {
    data: null
}

export default function (state = initialState, action) {
    const {
        type,
        payload
    } = action;

    switch (type) {
        case GET_DATA:
            return {
                ...state,
                data: payload.data
            }
        default:
            return state
    }
}