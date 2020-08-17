import {
    REGISTERATION_SUCCESS,
    REGISTERATION_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGOUT
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    token_admin: localStorage.getItem('token_admin'),
    isAuthenticated: null,
    isloading: true,
    user: null
};

export default function (state = initialState, action) {
    const {
        type,
        payload
    } = action;

    switch (type) {
        case USER_LOADING:
            return {
                isloading: true
            }

            case USER_LOADED:
                return {
                    ...state,
                    isAuthenticated: true,
                        isloading: false,
                        user: payload
                }

                case REGISTERATION_SUCCESS:
                case LOGIN_SUCCESS:
                    localStorage.setItem('token', payload.token);
                    localStorage.setItem('token_admin', payload.token_admin);
                    return {
                        ...state,
                        ...payload,
                        isAuthenticated: true,
                            isloading: false
                    }

                    case REGISTERATION_FAIL:
                    case LOGIN_FAILED:
                        /* case AUTH_ERROR: */
                    case LOGOUT:
                        localStorage.removeItem('token');
                        localStorage.removeItem('token_admin');
                        return {
                            ...state,
                            token: null,
                                token_admin: null,
                                isAuthenticated: false,
                                isloading: false,
                                user: null
                        }
                        default:
                            return state
    }
}