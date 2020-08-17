import {
    ADD_DATA,
    GET_DATA
} from '../actions/types';

const initialState = []

export default function (state = initialState, action) {
    const {
        type,
        payload
    } = action;

    switch (type) {
        case ADD_DATA:
            return {
                ...state,
                ...payload
            }
            /* 
                        case GET_DATA:
                            return [
                                state,
                                ...payload
                            ] */
            default:
                return state
    }
}