import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/root.reducers';
import rootSaga from './sagas/index';

const sagaMiddleware = createSagaMiddleware();
const initialState = {
    userReducer: {
        user: JSON.parse(localStorage.getItem('user')),
        accessToken: localStorage.getItem('accessToken')
    }
}
const store = createStore(rootReducer, initialState, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;