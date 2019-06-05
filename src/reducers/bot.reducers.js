import {FETCH_LIST_BOT_START, FETCH_LIST_BOT_SUCCESS, FETCH_LIST_BOT_FAILURE, CREATE_BOT_START, CREATE_BOT_SUCCESS, CREATE_BOT_FAILURE, DELETE_BOT_SUCCESS, DELETE_BOT_FAILURE, DELETE_BOT_START} from '../constants/bot.constants';

const initialState = {
    list: [],
    deleteList: [],
    message: null,
    error: false
}

export default function bots(state = initialState, action){
    switch(action.type){
        case FETCH_LIST_BOT_START:
            return state;
        case FETCH_LIST_BOT_SUCCESS:
            return {
                ...state,
                list: [...state.list, ...action.data],
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
                list: [action.data, ...state.list],
                loading: false
            }
        case CREATE_BOT_FAILURE:
            return {
                ...state,
                loading: false
            }
        case DELETE_BOT_START:
            return {
                ...state,
                deleteList: [...state.deleteList, action.botId],
                loading: true
            }
        case DELETE_BOT_SUCCESS:
            return {
                list: state.list.filter((obj) => obj._id !== action.botId),
                deleteList: state.deleteList.filter((id) => id !== action.botId),
                loading: false
            }
        case DELETE_BOT_FAILURE:
            return {
                ...state,
                deleteList: state.deleteList.filter((id) => id !== action.botId),
                loading: false
            }
        default:
            return state;
    }
}