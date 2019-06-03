import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/root.reducers';
import rootSaga from './sagas/index';
const sagaMiddleware = createSagaMiddleware();
const initialState = {
    userReducer: {
        user: localStorage.getItem('user') ? JSON.parse(atob(localStorage.getItem('user'))) : null,
        accessToken: localStorage.getItem('accessToken')
    }
}
const store = createStore(rootReducer, initialState, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;