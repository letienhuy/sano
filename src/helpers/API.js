import axios from 'axios';
import * as url from '../constants/url.constants';

export async function postLogin(name, password) {
    const result = await axios.post(url.LOGIN_URL, {name, password});
    return result;
}

export async function fetchUser(accessToken = null) {
    if(!accessToken) accessToken = localStorage.getItem('accessToken');
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

export async function fetchListLanguage() {
    let accessToken = localStorage.getItem('accessToken');
    const result = await axios.get(url.FETCH_LIST_LANGUAGE, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    });
    return result;
}

export async function fetchListTemplate(template) {
    let accessToken = localStorage.getItem('accessToken');
    const result = await axios.get(url.FETCH_LIST_TEMPLATE + '/' + template, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        },
    });
    return result;
}
export async function createNewBot(data) {
    let accessToken = localStorage.getItem('accessToken');
    const result = await axios.post(url.BOT_URL, data, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    });
    return result;
}
export async function editBot(botId, data) {
    let accessToken = localStorage.getItem('accessToken');
    const result = await axios.put(url.BOT_URL + '/' + botId, data, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    });
    return result;
}
export async function deleteBot(botId) {
    let accessToken = localStorage.getItem('accessToken');
    const result = await axios.delete(url.BOT_URL + '/' + botId, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    });
    return result;
}