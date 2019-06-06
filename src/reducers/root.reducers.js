import { combineReducers } from 'redux';
import userReducer from './user.reducers';
import botReducer from './bot.reducers';
import { loadingBarReducer } from 'react-redux-loading-bar';
import { confirmReducer } from '../components/layouts/Confirm';

const rootReducer = combineReducers({
    userReducer,
    botReducer,
    loadingBar: loadingBarReducer,
    confirmReducer: confirmReducer
});

export default rootReducer;