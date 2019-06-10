import { combineReducers } from 'redux';
import userReducer from './user.reducers';
import botReducer from './bot.reducers';
import intentReducer from './intent.reducers';
import { loadingBarReducer } from 'react-redux-loading-bar';
import { confirmReducer } from '../components/layout/Confirm';

const rootReducer = combineReducers({
    userReducer,
    botReducer,
    intentReducer,
    loadingBar: loadingBarReducer,
    confirmReducer: confirmReducer
});

export default rootReducer;