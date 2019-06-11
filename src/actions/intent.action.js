import {
    FETCH_INTENT_START, CREATE_INTENT_START, DELETE_INTENT_START, CLONE_INTENT_START, SELECTED_INTENT, FETCH_INTENT_SAMPLE_START
} from '../constants/intent.constants';

export function fetchIntents(botId){
    return{
        type: FETCH_INTENT_START,
        botId
    }
}
export function createIntent(data){
    return{
        type: CREATE_INTENT_START,
        data
    }
}
export function cloneIntent(intentId){
    return{
        type: CLONE_INTENT_START,
        intentId
    }
}
export function deleteIntent(intentId){
    return{
        type: DELETE_INTENT_START,
        intentId
    }
}
export function selectIntent(data){
    return{
        type: SELECTED_INTENT,
        data
    }
}