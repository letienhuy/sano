import { FETCH_LIST_BOT_START, CREATE_BOT_START, DELETE_BOT_START, UPDATE_BOT_START, CLONE_BOT_START, SELECTED_BOT } from '../constants/bot.constants';

export function fetchBots(page){
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
export function cloneBot(botId){
    return{
        type: CLONE_BOT_START,
        botId
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
export function selectedBot(data){
    return{
        type: SELECTED_BOT,
        data
    }
}