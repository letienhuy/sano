import {
    FETCH_INTENT_START, FETCH_INTENT_SUCCESS, FETCH_INTENT_FAILURE
} from '../constants/intent.constants';

export function fetchIntents(botId){
    return{
        type: FETCH_INTENT_START,
        botId
    }
}