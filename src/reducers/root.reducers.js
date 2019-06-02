import { combineReducers } from 'redux';
import userReducer from './user.reducers';
import { loadingBarReducer } from 'react-redux-loading-bar';   

const rootReducer = combineReducers({
    userReducer,
    loadingBar: loadingBarReducer
});

export default rootReducer;