import {
    FETCH_INTENT_START,
    FETCH_INTENT_SUCCESS,
    FETCH_INTENT_FAILURE,
    DELETE_INTENT_START,
    DELETE_INTENT_SUCCESS,
    DELETE_INTENT_FAILURE,
    CLONE_INTENT_SUCCESS,
    CLONE_INTENT_FAILURE,
    CLONE_INTENT_START,
    SELECTED_INTENT,
    CREATE_INTENT_START,
    CREATE_INTENT_SUCCESS,
    CREATE_INTENT_FAILURE,
    FETCH_INTENT_SAMPLE_START,
    FETCH_INTENT_SAMPLE_SUCCESS,
    FETCH_INTENT_SAMPLE_FAILURE
} from '../constants/intent.constants';

const initialState = {
    selectedIntent: null,
    list: [],
    cloneList: [],
    deleteList: [],
    message: null,
    loading: false
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
        case CREATE_INTENT_START:
            return {
                ...state,
                loading: true
            };
        case CREATE_INTENT_SUCCESS:
            return {
                ...state,
                list: [action.data, ...state.list],
                loading: false
            };
        case CREATE_INTENT_FAILURE:
            return {
                ...state,
                loading: false
            };
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