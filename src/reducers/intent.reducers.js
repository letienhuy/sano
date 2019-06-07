import {
    FETCH_INTENT_START, FETCH_INTENT_SUCCESS, FETCH_INTENT_FAILURE
} from '../constants/intent.constants';

const initialState = {

}
export default function intents(state = initialState, action){
    switch(action.type){
        case FETCH_INTENT_START:
            return state;
        case FETCH_INTENT_SUCCESS:
            return state;
        case FETCH_INTENT_FAILURE:
            return state;
        default:
            return state;
    }
}