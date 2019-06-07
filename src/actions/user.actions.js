import { LOGIN_START, FETCH_USER_START } from '../constants/user.constants';

export function login(name, password){
    return{
        type: LOGIN_START,
        name,
        password
    }
}

export function fetchUser(){
    return{
        type: FETCH_USER_START
    }
}