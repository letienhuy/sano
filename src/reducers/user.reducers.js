import {LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE, FETCH_USER_SUCCESS, FETCH_USER_START} from '../constants/user.constants';

const initialState = {
    user: null,
    accessToken: null,
    message: null,
    loading: false,
    error: false
};

export default function users(state = initialState, action) {
    switch (action.type) {
        case LOGIN_START:
            return {
                ...state,
                loading: true
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                accessToken: action.accessToken,
                message: action.message,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                message: action.message,
                loading: false,
                error: true
            };
        case FETCH_USER_START:
            return state;
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                user: action.user
            }
        default:
            return state;
    }
}