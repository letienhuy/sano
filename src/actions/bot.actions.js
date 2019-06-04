import { FETCH_LIST_BOT_START, FETCH_LIST_BOT_SUCCESS, FETCH_LIST_BOT_FAILURE } from '../constants/bot.constants';

export function fetchBots(page = 1){
    return{
        type: FETCH_LIST_BOT_START,
        page
    }
}