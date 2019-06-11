import {
    FETCH_LIST_BOT_START,
    FETCH_LIST_BOT_SUCCESS,
    FETCH_LIST_BOT_FAILURE,
    CREATE_BOT_START,
    CREATE_BOT_SUCCESS,
    CREATE_BOT_FAILURE,
    DELETE_BOT_SUCCESS,
    DELETE_BOT_FAILURE,
    DELETE_BOT_START,
    UPDATE_BOT_START,
    UPDATE_BOT_SUCCESS,
    UPDATE_BOT_FAILURE,
    CLONE_BOT_START,
    CLONE_BOT_SUCCESS,
    CLONE_BOT_FAILURE,
    SELECTED_BOT,
    SHOW_DEBUG,
    HIDE_DEBUG,
    SET_TRAINING,
    UNSET_TRAINING
} from '../constants/bot.constants';

const initialState = {
    selectedBot: null,
    list: [],
    currentPage: 1,
    totalPages: 1,
    deleteList: [],
    cloneList: [],
    listLanguages: [],
    listTemplates: [],
    listBuiltIns: [],
    showDebug: false,
    isTraining: false,
    message: null,
    loading: false
}

export default function bots(state = initialState, action) {
    switch (action.type) {
        case FETCH_LIST_BOT_START:
            return state;
        case FETCH_LIST_BOT_SUCCESS:
            return {
                ...state,
                list: action.data,
                listLanguages: action.listLanguages,
                listTemplates: action.listTemplates,
                listBuiltIns: action.listBuiltIns,
                currentPage: action.current_page,
                totalPages: action.total_pages
            };
        case FETCH_LIST_BOT_FAILURE:
            return state;
        case CREATE_BOT_START:
            return {
                ...state,
                loading: true
            }
        case CREATE_BOT_SUCCESS:
            return {
                ...state,
                list: [
                    action.data, ...state.list
                ],
                loading: false
            }
        case CREATE_BOT_FAILURE:
            return {
                ...state,
                loading: false
            }
        case CLONE_BOT_START:
            return {
                ...state,
                cloneList: [action.botId, ...state.cloneList]
            }
        case CLONE_BOT_SUCCESS:
            state.cloneList.shift();
            return {
                ...state,
                list: [action.data, ...state.list],
            }
        case CLONE_BOT_FAILURE:
            state.cloneList.shift();
            return {
                ...state
            }
        case UPDATE_BOT_START:
            return {
                ...state,
                loading: true
            }
        case UPDATE_BOT_SUCCESS:
            return {
                ...state,
                list: [action.data, ...state.list.filter(obj => obj._id !== action.data._id)],
                loading: false
            }
        case UPDATE_BOT_FAILURE:
            return {
                ...state,
                loading: false
            }
        case DELETE_BOT_START:
            return {
                ...state,
                deleteList: [
                    ...state.deleteList,
                    action.botId
                ]
            }
        case DELETE_BOT_SUCCESS:
            return {
                ...state,
                list: state.list.filter((obj) => obj._id !== action.botId),
                deleteList: state.deleteList.filter((id) => id !== action.botId)
            }
        case DELETE_BOT_FAILURE:
            return {
                ...state,
                deleteList: state.deleteList.filter((id) => id !== action.botId)
            }
        case SELECTED_BOT:
            return {
                ...state,
                selectedBot: action.data
            }
        case SHOW_DEBUG:
            return {
                ...state,
                showDebug: true
            }
        case HIDE_DEBUG:
            return {
                ...state,
                showDebug: false
            }
        case SET_TRAINING:
            return {
                ...state,
                isTraining: true
            }
        case UNSET_TRAINING:
            return {
                ...state,
                isTraining: false
            }
        default:
            return state;
    }
}