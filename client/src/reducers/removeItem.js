/* import {
    DELETE
} from '../actions/types';

const initialState = []

export default function (state = initialState, action) {
    const {
        type,
        payload
    } = action;

    switch (type) {
        case DELETE:
            return state.filter(item => item.id !== payload)
        default:
            return state
    }
} */