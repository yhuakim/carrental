import {
    GET_DATA,
    DELETE_DATA,
    QUEUE_DATA,
    ADD_DATA
} from '../actions/types';

const initialState = {
    data: null,
    success: false,
    response: null
}

export default function (state = initialState, action) {
    const {
        type,
        payload
    } = action;

    switch (type) {
        case ADD_DATA:
            localStorage.setItem('transferList', payload)
            return {
                ...state,
                success: payload.success
            }
        case GET_DATA:
            localStorage.setItem('transferList', payload)
            return {
                ...state,
                data: payload.data,
                    success: payload.success
            }
            case DELETE_DATA:
                localStorage.removeItem('transferList')
                return {
                    ...payload
                }
            case QUEUE_DATA:
                localStorage.removeItem('transferList')
                return {
                    ...state,
                    response: payload
                }
                default:
                return state
    }
}