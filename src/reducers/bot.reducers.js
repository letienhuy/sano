import {FETCH_LIST_BOT_START, FETCH_LIST_BOT_SUCCESS, FETCH_LIST_BOT_FAILURE} from '../constants/bot.constants';

const initialState = {
    list: [],
    message: null,
    error: false
}

export default function bots(state = initialState, action){
    switch(action.type){
        case FETCH_LIST_BOT_START:
            return {
                ...state,
                error: false
            };
        case FETCH_LIST_BOT_SUCCESS:
            return {
                ...state,
                list: [...state.list, ...action.data],
                currentPage: action.current_page,
                totalPages: action.total_pages
            };
        case FETCH_LIST_BOT_FAILURE:
            return {
                ...state,
                message: action.message,
                error: true
            };
        default:
            return state;
    }
}