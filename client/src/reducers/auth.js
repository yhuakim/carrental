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
                ...state,
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
                    return {
                        ...state,
                        ...payload,
                        isAuthenticated: true,
                            isloading: false
                    }

                    case REGISTERATION_FAIL:
                    case LOGIN_FAILED:
                    case AUTH_ERROR:
                    case LOGOUT:
                        localStorage.removeItem('token');
                        localStorage.removeItem('role');
                        return {
                            ...state,
                            token: null,
                                isAuthenticated: false,
                                isloading: false,
                                user: null
                        }
                        default:
                            return state
    }
}
