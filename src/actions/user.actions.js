import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE, FETCH_USER_START, FETCH_USER_SUCCESS } from '../constants/user.constants';

export function login(name, password){
    return{
        type: LOGIN_START,
        name,
        password
    }
}

export function fetchUser(accessToken){
    return{
        type: FETCH_USER_START,
        accessToken
    }
}