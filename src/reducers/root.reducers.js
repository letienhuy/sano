import { combineReducers } from 'redux';
import userReducer from './user.reducers';
import botReducer from './bot.reducers';
import { loadingBarReducer } from 'react-redux-loading-bar';

const rootReducer = combineReducers({
    userReducer,
    botReducer,
    loadingBar: loadingBarReducer
});

export default rootReducer;