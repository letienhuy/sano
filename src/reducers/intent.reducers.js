import {
    FETCH_INTENT_START, FETCH_INTENT_SUCCESS, FETCH_INTENT_FAILURE, DELETE_INTENT_START, DELETE_INTENT_SUCCESS, DELETE_INTENT_FAILURE, CLONE_INTENT_SUCCESS, CLONE_INTENT_FAILURE, CLONE_INTENT_START, SELECTED_INTENT
} from '../constants/intent.constants';

const initialState = {
    selectedIntent: null,
    list: [],
    cloneList: [],
    deleteList: [],
}
export default function intents(state = initialState, action){
    switch(action.type){
        case FETCH_INTENT_START:
            return state;
        case FETCH_INTENT_SUCCESS:
            return {
                ...state,
                list: action.data
            };
        case FETCH_INTENT_FAILURE:
            return state;
        case CLONE_INTENT_START:
            return {
                ...state,
                cloneList: [...state.cloneList, action.intentId]
            };
        case CLONE_INTENT_SUCCESS:
            return {
                ...state,
                list: [action.data, ...state.list],
                cloneList: state.cloneList.filter((id) => id !== action.intentId)
            };
        case CLONE_INTENT_FAILURE:
            return {
                ...state,
                cloneList: state.cloneList.filter((id) => id !== action.intentId)
            };
        case DELETE_INTENT_START:
            return{
                ...state,
                deleteList: [...state.deleteList, action.intentId]
            }
        case DELETE_INTENT_SUCCESS:
            return{
                ...state,
                list: state.list.filter((obj) => obj._id !== action.intentId),
                deleteList: state.deleteList.filter((id) => id !== action.intentId)
            }
        case DELETE_INTENT_FAILURE:
            return{
                ...state,
                deleteList: state.deleteList.filter((id) => id !== action.intentId)
            }
        case SELECTED_INTENT:
            return{
                ...state,
                selectedIntent: action.data
            }
        default:
            return state;
    }
}