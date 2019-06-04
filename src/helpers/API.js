import axios from 'axios';
import * as url from '../constants/url.constants';

export async function postLogin(name, password) {
    const result = await axios.post(url.LOGIN_URL, {name, password});
    return result;
}

export async function fetchUser() {
    let accessToken = localStorage.getItem('accessToken');
    const result = await axios.get(url.FETCH_USER_URL, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    });
    return result;
}

export async function fetchBots(page) {
    let accessToken = localStorage.getItem('accessToken');
    const result = await axios.get(url.FETCH_LIST_BOT + '/'+page, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    });
    return result;
}