import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/root.reducers';
import rootSaga from './sagas/index';

const sagaMiddleware = createSagaMiddleware();
let initialUser = null;

try{
    initialUser = JSON.parse(atob(localStorage.getItem('user')));
}catch(e){
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
}
const initialState = {
    userReducer: {
        user: initialUser,
        accessToken: localStorage.getItem('accessToken')
    }
}
const store = createStore(rootReducer, initialState, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;