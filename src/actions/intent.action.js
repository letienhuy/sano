import {
    FETCH_INTENT_START
} from '../constants/intent.constants';

export function fetchIntents(botId){
    return{
        type: FETCH_INTENT_START,
        botId
    }
}