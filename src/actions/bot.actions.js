import { FETCH_LIST_BOT_START, CREATE_BOT_START, DELETE_BOT_START, UPDATE_BOT_START } from '../constants/bot.constants';

export function fetchBots(page = 1){
    return{
        type: FETCH_LIST_BOT_START,
        page
    }
}
export function createNewBot(data){
    return{
        type: CREATE_BOT_START,
        data
    }
}
export function editBot(data){
    return{
        type: UPDATE_BOT_START,
        data
    }
}
export function deleteBot(botId){
    return{
        type: DELETE_BOT_START,
        botId
    }
}